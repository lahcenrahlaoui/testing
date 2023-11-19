const cors = require("cors");
const cookieParser = require("cookie-parser");

const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const session = require("express-session");

const passport = require("passport");
const postsRoute = require("./routes/postsRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL || "" }));

require("./models/User");
require("./services/passport");

mongoose
    .connect(keys.database, {})
    .then(() => {
        console.log("connected to mongoDB...");
    })
    .catch((err) => {
        console.log("could not connect to Mongo", err);
    });

app.use(
    session({
        secret: keys.cookieKey,
        resave: true,
        saveUninitialized: true,
        cookie: {
            sameSite: "none",
            secure: true,
            maxAge: 30 * 60 * 60 * 24 * 1000, // One Week
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
app.use("/api", postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
