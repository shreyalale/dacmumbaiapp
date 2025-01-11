// import dependency module
var express=require('express'); var session =require('express-session'); var parseurl=require('parseurl');
var path=require('path');
var bodyParser=require('body-parser');
const app=express();
//configure HTTP pipeline
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Session Memory Configuration
var sessionOptions = {
    secret: "secret",  // Secret for signing the session ID
    resave: true,      // Forces session to be saved even when unmodified
    saveUninitialized: false // Do not save uninitialized sessions
};
app.use(session(sessionOptions));
// Configure Interceptor for Session Management
app.use(function (req, res, next) {
    // Initialize session variables if they do not exist
    if (!req.session.views) {
        req.session.views = {};
        req.session.views.shoppingCart = [];
    }
    
    // Parse the current request URL
    var pathname = parseurl(req).pathname;
    
    // Count the views for the current path
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
    
    next();
});
var staticFolder = express.static(path.join(__dirname, "public"));
app.use(staticFolder);

// Handle the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start the server on port 8000
app.listen(8000, () => {
    console.log("ShoppingCart Web App is listening on port 8000");
});

//module.exports = app;