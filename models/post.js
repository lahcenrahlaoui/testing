const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    
    title: String,
    content: String,
    tags: [String],
    _user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;