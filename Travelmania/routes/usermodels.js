const mongoose = require("mongoose");
const pbkdf2 = require("pbkdf2-password");
const hasher = pbkdf2();
const credentials= require("../credentials")

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
});

userSchema.methods.setPassword = function (password, callback) {
    hasher({ password }, (err, pass, salt, hash) => {
        if (err) {
            return callback(err);
        }
        this.salt = salt;
        this.hash = hash;
        callback();
    });
};

userSchema.methods.authenticate = function (password, callback) {
    hasher({ password, salt: this.salt }, (err, pass, salt, hash) => {
        if (err) {
            return callback(err);
        }
        callback(null, this.hash === hash);
    });
};

const User = mongoose.model("User", userSchema);

async function seedUser(uri) {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const existingUser = await User.findOne({ user: "Admin" });
        if (existingUser) {
            console.log("Admin user already exists.");
            return;
        }

        const newUser = new User({ user: "Admin" });
        newUser.setPassword(credentials.root.pw, async (err) => {
            if (err) {
                console.error("Error setting password:", err);
                return;
            }
            await newUser.save();
            console.log("Admin user seeded successfully.");
        });
    } catch (err) {
        console.error("Error during user seeding:", err);
    } finally {
        mongoose.connection.close();
    }
}

module.exports = { User, seedUser };
