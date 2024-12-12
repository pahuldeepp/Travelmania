const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require("./usermodels"); // Ensure this path is correct

// Middleware to ensure the User model is available in the request object
router.use((req, res, next) => {
    req.model = User;
    next();
});

// Function to restrict access based on session user existence
function restrict(req, res, next) {
    console.log("Session Data:", req.session); // Debugging: Check session content
    if (req.session && req.session.user) {
        next(); // User is authenticated
    } else {
        req.session.error = "Access denied. Please log in.";
        res.redirect("/login");
    }
}

// Route to log out a user and destroy session
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Unable to log out. Please try again.");
        } else {
            res.redirect("/login");
        }
    });
});

router.post("/signup", async(req, res)=>{
    try{
        const {username,email, password}= req.body;
        
        // Validate inputs
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        // Check if the user already exists
        const existingUser = await User.findOne({ user: username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username already taken. Please choose another." });
        }
        const newUser= new User({user: username});
          // Set password with hashing
        newUser.setPassword(password, async(err)=>{
            if (err) {
                console.error("Error setting password:", err);
                return res.status(500).json({ success: false, message: "Error during signup. Please try again." });
            }
            await newUser.save();
            res.json({ success: true, message: "Signup successful. You can now log in." });

        })


    }catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
})
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userDoc = await User.findOne({ user: username });
        if (!userDoc) {
            return res.status(401).json({ success: false, message: "Authentication failed. User not found." });
        }

        userDoc.authenticate(password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Server error during authentication." });
            }

            if (isMatch) {
                req.session.regenerate(() => {
                    req.session.user = userDoc; // Save user data in session
                    res.json({ success: true, message: "Login successful.", redirectUrl: "/home" });
                });
            } else {
                res.status(401).json({ success: false, message: "Authentication failed. Incorrect password." });
            }
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

router.get("/top", restrict,(req, res) => {
    res.sendFile(path.join(__dirname, "../public", "top.html"));
});

router.get("/contact", restrict, (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "about.html"));
});

router.get("/home", restrict, (req, res) => {
    const user = req.session.user;
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Serve static pages
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "login.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "login.html"));
});


// Dynamic route for city information
router.get('/city/:cityName', (req, res) => {
    const { cityName } = req.params;
    const cityData = require('./citydata'); // Ensure this file exists and is correctly formatted
    const cityInfo = cityData[cityName.toLowerCase()];

    if (cityInfo) {
        res.render('cities.njk', {
            cityName: cityInfo.name,
            cityDescription: cityInfo.description,
            cityImage: cityInfo.cityImage,
            attractions: cityInfo.attractions
        });
    } else {
        res.status(404).send('City not found');
    }
});

// 404 handler as the last route
router.use((req, res) => {
    res.status(404).send("Page not found");
});

module.exports = router;
