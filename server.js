require("dotenv").config();
const express = require("express");
const app = express();
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("./config/passport-config");
const isLoggedIn = require("./middleware/isLoggedIn");
const methodOverride = require("method-override");
const SECRET_SESSION = process.env.SECRET_SESSION;
const PORT = process.env.PORT || 3000;

// import model
const { User, Workout, Food, Goal } = require("./models");
const Contact = require("./models/contact");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(
    session({
        secret: SECRET_SESSION,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.json());

// initial passport
app.use(passport.initialize());
app.use(passport.session());

// middleware for tracking users and alerts
app.use((req, res, next) => {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next(); // going to said route
});

app.get("/", (req, res) => {
    res.render("home", {});
});

app.get("/contact", (req, res) => {
    res.render("contact", {});
});

// import routes
app.use("/", require("./controllers/auth"));
app.use("/contact", require("./controllers/contact"));
app.use("/user/workouts", require("./controllers/workouts"));
app.use("/user/food-log", require("./controllers/food"));
app.use("/user/goals", require("./controllers/goals"));
app.use('/api/nutrition', require('./controllers/nutrition'));
app.use('/user/profile', require('./controllers/profileEdit'));

// --- AUTHENTICATED ROUTE: go to user profile page ---
app.get("/user/profile", isLoggedIn, (req, res) => {
    const { username, email, phoneNumber } = req.user;
    res.render("profile", { username, email, phoneNumber });
});

app.get("/user/dashboard", isLoggedIn, (req, res) => {
    const { username } = req.user;
    res.render("dashboard", { username });
});

app.use((req, res, next) => {
    res.status(404).render('404');
});

const server = app.listen(PORT, () => {
    console.log("Server Running on Port:", PORT);
});

module.exports = server;
