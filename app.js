if(process.env.NODE_ENV!='production'){
    require('dotenv').config()
}
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const wrapAsync = require("./utils/wrapAsync.js");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require('path');
const { listingSchema } = require('./schema.js');
const { reviewSchema } = require('./schema.js');
const User = require('./models/user.js');
const listingRoute = require("./routes/listingRoute.js");
const reviewRoute = require('./routes/reviewRoute.js');
const userRouter = require('./routes/userRoute.js');

//including passport
const passport = require('passport');
const localStrategy = require('passport-local');

//for creating session id in cookies
const Session = require("express-session");
const MongoStore=require('connect-mongo')

//using flash messages
const flash = require("connect-flash");
const DB_URL=process.env.ATLASDB_URL
//creating store for session in mongo
const store=MongoStore.create({
    mongoUrl:DB_URL,
    crypto:{
        secret:process.env.SECRET_CODE
    },
    touchAfter:24*3600
})

//for creating session id in cookies
const sessionOptions = {
    store,       //adding mongo store for sessions
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: true,
    //setting cookie data maxage and expiry up to 1 week using express session
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true
    }
};

//creating middleware for express session 
app.use(Session(sessionOptions));
//using flash message
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine('ejs', ejsMate);
const method_override = require("method-override");

// Use method-override middleware
app.use(method_override('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



async function main() {
    await mongoose.connect(DB_URL);
}

main()
    .then(() => {
        console.log("Database Created");
    })
    .catch((err) => {
        console.log(err);
    });

//creating middleware of res.local to use flash message
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    //saving whether user is logined or not in locals
    res.locals.currUser=req.user;
    next();
});

app.use("/listings", listingRoute);
//REVIEWS
//creating middleware for schema validation
app.use("/listings/:id/review", reviewRoute);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.listen(8080, () => {
    console.log("Server Connected");
});

app.use((err, req, res, next) => {
    res.render("error.ejs", { err });
});
