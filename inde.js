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

const helmet = require("helmet");
const cookieParser = require("cookie-parser");

app.use(helmet());
app.use(cookieParser());

app.get("/setcookie", (req, res) => {
    res.cookie(`Cookie token name`, `encrypted cookie string Value`, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // expires works the same as the maxAge
        expires: new Date(),
        secure: true,
        httpOnly: true,
        sameSite: "lax",
    });
    res.send("Cookie have been saved successfully");
});

app.get("/deletecookie", (req, res) => {
    //show the saved cookies
    res.clearCookie();
    res.send("Cookie has been deleted successfully");
});

app.get("/xx", (req, res) => {
    // check if user is logged in, by checking cookie
    let username = req.cookies.username;

    // render the home page
      res.send(username);
});

// const ENVIREMENT = process.env.ENVIREMENT || "development";
// if (ENVIREMENT === "development") {
//     app.use(cors());

//     app.use(
//         cookieSession({
//             maxAge: 30 * 24 * 60 * 60 * 1000,
//             keys: [keys.cookieKey],
//         })
//     );
// } else {
//     app.use(
//         cors({
//             origin: "https://testing-client-ashen.vercel.app",
//             credentials: true,
//         })
//     );
//     app.set("trust proxy", 1);
//     app.use(
//         session({
//             secret: keys.cookieKey,
//             resave: true,
//             saveUninitialized: true,
//             cookie: {
//                 sameSite: "none",
//                 secure: true,
//                 maxAge: 30 * 60 * 60 * 24 * 1000, // One Week
//             },
//         })
//     );
// }

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

require("./routes/authRoutes")(app);

app.use("/api", postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
