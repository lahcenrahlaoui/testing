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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
require("./routes/authRoutes")(app);

app.listen(5000);