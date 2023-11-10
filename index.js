const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const cookieSession = require("cookie-session");

const passport = require("passport");
const cors = require("cors");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.database);
const app = express();
app.use(cors());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
