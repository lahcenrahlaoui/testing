const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const session = require("express-session");
const cookieSession = require("cookie-session");

const passport = require("passport");
const cors = require("cors");

const postsRoute = require("./routes/postsRoute");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.database);
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());
// app.use(function (req, res, next) {
//     res.header("Content-Type", "application/json;charset=UTF-8");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.cookie("token", "someauthtoken");

//     next();
// });

const ENVIREMENT = process.env.ENVIREMENT || "development";
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
        cookieSession({
            secret: keys.cookieKey,
            resave: true,
            saveUninitialized: true,
            cookie: {
                sameSite: "none",
                secure: true,
                maxAge: 30 * 60 * 60 * 24 * 1000, // One Week
            },
            httpOnly: true,
        })
    );
}

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

require("./routes/authRoutes")(app);

app.use("/api", postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
