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
        session({
            secret: keys.cookieKey,
            resave: true,
            saveUninitialized: true,
            cookie: {
                sameSite: "none",
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
            },
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
