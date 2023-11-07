const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.database);
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
require("./routes/authRoutes")(app);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

const PORT = process.env.PORT || 5000

app.listen(PORT);
