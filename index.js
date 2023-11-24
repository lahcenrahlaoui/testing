// packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

// keys
const keys = require("./config/keys");
const PORT = process.env.PORT || 5000;
const ENVIREMENT = process.env.ENVIREMENT || "development";

// files
require("./models/User");
require("./services/passport")(passport);
const app = express();

// middlewares
app.use(express.json());

// passport package
if (ENVIREMENT === "development") {
    app.use(cors());
    app.use(
        cookieSession({
            maxAge: 30 * 24 * 60 * 60 * 1000,
            keys: [keys.cookieKey],
        })
    );
} else {
    app.use(
        cors({
            origin: "https://testing-client-ashen.vercel.app",
            credentials: true,
        })
    );
    app.set("trust proxy", 1);
    app.use(
        // cookieSession({
        //     sameSite: "none",
        //     secret: keys.cookieKey,
        //     resave: true,
        //     saveUninitialized: true,
        //     cookie: {
        //         sameSite: "none",
        //         maxAge: 30 * 60 * 60 * 24 * 1000, // One Week
        //         secure: true,
        //     },

        //     httpOnly: false,
        // })
        session({
            secret: keys.cookieKey,
            resave: false,
            saveUninitialized: false,
        })
    );
}

// passport middleware

app.use(passport.initialize());
app.use(passport.session());

// routes

require("./routes/authRoutes")(app);
require("./routes/postsRoute")(app);
app.use(cookieParser(keys.cookieKey));

// connect to database
mongoose.connect(keys.database).then(() => {
    app.listen(PORT);
});
