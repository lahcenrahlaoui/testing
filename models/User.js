const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    photos: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User ;
