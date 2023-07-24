require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require("./auth/passport");
const routes = require('./routes');

app.use(cors({
    origin: process.env.CLIENT_URl,
}));
// Set up CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URl);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Set the header to 'true'
    next();
});


app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    maxAge: 30 * 24 * 60 * 60 * 1000,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.get("/", (req, res) => {
    res.send("ok");
});

app.listen(process.env.PORT || 3000);
