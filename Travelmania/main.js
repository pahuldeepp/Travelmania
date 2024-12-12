const express = require("express");
const path = require("path");
const fs = require("fs");
const multiparty = require("multiparty");
const nunjucks = require("nunjucks");
const mongodb = require("mongodb");
const http = require("http");
const { WebSocketServer } = require("ws");
const credentials=require("./credentials")
const port = 4000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });
const aws= require("aws-sdk");
// MongoDB URI (for local MongoDB setup)
const uri = `mongodb+srv://${credentials.mongodb.user}:${credentials.mongodb.pw}@cluster0.yl5ot.mongodb.net/express?retryWrites=true&w=majority`;
// const { S3Client, CreateBucketCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const multer= require('multer');
const bodyParser= require('body-parser');
//const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const contactws=new WebSocketServer({noServer:true});
const mongoose= require("mongoose");
const Suggestion= require("./mongoose/suggestion");
const appRoutes= require("./routes/routes")
const session= require("express-session");
const MongoStore = require('connect-mongo');

app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses form-encoded data
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${credentials.mongodb.user}:${credentials.mongodb.pw}@cluster0.yl5ot.mongodb.net/express?retryWrites=true&w=majority`,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            collectionName: "sessions",
        }),
        secret: credentials.session.secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production", // Only secure in production
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
        },
    })
);

app.get("/displayCookies",(req, res)=>{
    const sessionData= req.session;
    console.log(sessionData)
    res.redirect("/home")
})




// Configure AWS region and credentials
// const s3 = new S3Client({
//     region: 'us-west-2', // Set to US West (Oregon)
//     credentials: {
//       accessKeyId: credentials.aws.accesskey, // Your AWS Access Key ID
//       secretAccessKey: credentials.aws.secretaccesskey, // Your AWS Secret Access Key
//     },
//   });
  
//   const { S3Client, HeadBucketCommand } = require("@aws-sdk/client-s3");

  
const { S3Client, HeadBucketCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: credentials.credentials.region,
  credentials: {
    accessKeyId: credentials.credentials.accessKeyId,
    secretAccessKey: credentials.credentials.secretAccessKey,
  },
});

// async function checkBucket() {
//   try {
//     // Ensure HeadBucketCommand is correctly invoked
//     await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
//     console.log(`Bucket "${bucketName}" exists and is accessible.`);
//   } catch (err) {
//     console.error(`Error accessing bucket "${bucketName}":`, err.message);
//   }
// }

// checkBucket();

  
// Generate a unique bucket name
// const generateUniqueBucketName = () => {
//   const baseName = 'my-unique-bucket';
//   const uuid = uuidv4(); // Generate a random UUID
//   return `${baseName}-${uuid}`;
// };

// // Function to create the bucket
// const createBucket = async () => {
//   const bucketName = generateUniqueBucketName();
//   const bucketParams = { Bucket: bucketName };

//   try {
//     const command = new CreateBucketCommand(bucketParams);
//     const response = await s3.send(command);
//     console.log('Bucket created successfully:', response.Location || `s3://${bucketName}`);
//   } catch (err) {
//     console.error('Error creating bucket:', err.message);
//   }
// };

// createBucket();




const storage=multer.memoryStorage();



// Configure Nunjucks for templating
nunjucks.configure("views", {
    autoescape: true,
    express: app,
    watch: true,
});

server.on("upgrade", (request, socket, head) => {
    const { pathname } = new URL(request.url, `http://${request.headers.host}`);

    if (pathname === "/ws") {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request);
        });
    } else if (pathname === "/contactws") {
        contactws.handleUpgrade(request, socket, head, (ws) => {
            contactws.emit("connection", ws, request);
        });
    } else {
        socket.destroy(); // Reject unknown WebSocket paths
    }
});


let reactiveCollection;

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose.connection;
        reactiveCollection = db.collection("cities");
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Could not connect to MongoDB:", err.message);
        process.exit(1);
    }
}

connectToMongoDB();
let filecollection;
async function connectToMongoDBcontact() {
    try {
        console.log("Connecting to MongoDB with Mongoose...");
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB with Mongoose!");

        // Access the "suggestions" collection via Mongoose
        filecollection = mongoose.connection.collection("suggestions");
        console.log("Accessing 'suggestions' collection through Mongoose.");
    } catch (err) {
        console.error("Could not connect to MongoDB with Mongoose:", err.message);
        process.exit(1);
    }
}

  connectToMongoDBcontact();
// WebSocket setup
const Travel = require("./mongoose/travel");

wss.on("connection", (ws) => {
    console.log("WebSocket connection established for /ws");

    ws.on("message", async (message) => {
        try {
            const data = JSON.parse(message);

            // Validate and save the travel data using the Travel model
            const newTravel = new Travel(data);
            await newTravel.save();

            console.log("Travel data saved:", data);
            ws.send("Travel data saved successfully.");
        } catch (err) {
            console.error("Error saving travel data:", err.message);
            ws.send(`Error saving travel data: ${err.message}`);
        }
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed for /ws");
    });
});

contactws.on("connection", (ws) => {
    console.log("WebSocket connection established for /contactws");

    let metadata = null; // Metadata for the file

    ws.on("message", async (data, isBinary) => {
        if (!isBinary) {
            // Handle metadata
            try {
                metadata = JSON.parse(data.toString());
                console.log("Received Metadata:", metadata);

                // Save metadata to MongoDB
                await Suggestion.create({
                    name: metadata.name,
                    email: metadata.email,
                    message: metadata.message,
                });

                ws.send("Metadata saved successfully.");
            } catch (err) {
                console.error("Error saving metadata to MongoDB:", err.message);
                ws.send("Error saving metadata.");
            }
        } else if (metadata) {
            // Handle binary file data only after metadata
            try {
                const fileName = `${Date.now()}-${metadata.fileName}`;
                const s3Params = {
                    Bucket: credentials.bucket.bucketName,
                    Key: fileName,
                    Body: data,
                    ContentType: metadata.fileType,
                };

                await s3.send(new PutObjectCommand(s3Params));
                console.log("File uploaded to S3 successfully.");
                ws.send("File uploaded successfully to S3.");
            } catch (err) {
                console.error("Error uploading file to S3:", err.message);
                ws.send("Error uploading file.");
            }
        } else {
            ws.send("Metadata is required before sending file data.");
        }
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed for /contactws");
    });
});

// Define the form parsing logic explicitly
app.post('/upload', (req, res) => {
    const form = new multiparty.Form();

    form.on("part", (part) => {
        if (!part.headers["content-type"].startsWith("image/")) {
            res.status(415).send("Invalid file type");
            return part.resume();
        }

        if (part.byteCount > 3_000_000) {
            res.status(413).send("File too large");
            return part.resume();
        }

        const S3Params = {
            Bucket: credentials.bucket.bucketName,
            Key: `${Date.now()}-${part.filename}`,
            Body: part,
            ContentType: part.headers["content-type"],
        };

        s3.send(new PutObjectCommand(S3Params)).then(() => {
            console.log("File uploaded successfully to S3.");
            res.status(200).send("File uploaded successfully.");
        }).catch((err) => {
            console.error("Error uploading to S3:", err.message);
            res.status(500).send("Error uploading file.");
        });
    });

    form.on("error", (err) => {
        console.error("Form error:", err.message);
        res.status(500).send("Form processing error.");
    });

    form.parse(req);
});



// Serve static files

app.use(express.static('public'));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use(appRoutes);
// Start the server
server.listen(port, () => console.log(`App is listening at http://localhost:${port}`));
