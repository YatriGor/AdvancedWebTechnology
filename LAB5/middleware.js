const express = require("express");
const cookieParser = require("cookie-parser"); // Third-party middleware
const app = express();
const router = express.Router();
const PORT = 3001;

// 1. Application-level Middleware
app.use((req, res, next) => {
    console.log("Application-level Middleware: Request received");
    next();
});

// 2. Built-in Middleware (express.json)
app.use(express.json()); 

// 3. Third-party Middleware (Cookie Parser)
app.use(cookieParser());

// 4. Router-level Middleware
router.use((req, res, next) => {
    console.log("Router-level Middleware: Router is being used");
    next();
});

// Sample route inside router
router.get("/route", (req, res) => {
    res.send("Router-level Middleware example");
});

// 5. Configurable Middleware (Factory Function)
const configurableMiddleware = (options) => {
    return (req, res, next) => {
        if (options.log) {
            console.log("Configurable Middleware: Logging is enabled");
        }
        next();
    };
};

// Using configurable middleware with an option
app.use(configurableMiddleware({ log: true }));

// Route to set a cookie
app.get("/set-cookie", (req, res) => {
    res.cookie("user", "Yatri Gor"); // Set a cookie
    res.send("Cookie has been set");
});

// Route to read a cookie
app.get("/get-cookie", (req, res) => {
    res.send(`Cookies: ${JSON.stringify(req.cookies)}`);
});

// Attach router to the app
app.use("/api", router);

// 6. Error-handling Middleware
app.use((err, req, res, next) => {
    console.error("Error-handling Middleware:", err.message);
    res.status(500).send("Something went wrong!");
});


app.get("/", (req, res) => {
    res.send("Middleware Example in Express.js");
});


app.listen(PORT, ()=>{
    console.log(`The server is running on http://localhost:${PORT}`);
})
