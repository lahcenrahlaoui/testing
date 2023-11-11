const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

import session from 'express-session';

const passport = require("passport");
const cors = require("cors");

require("./models/User");
require("./services/passport");

mongoose.connect(keys.database);
const app = express();

app.use(cors({ origin: ["https://testing-client-ashen.vercel.app" , "https://localhost:3000" , "http://localhost:3000"], credentials: true }))
app.set("trust proxy", 1);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
  }))
// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey],
//     })
// );

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
