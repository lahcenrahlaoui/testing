const mongoose = require("mongoose");

// const Post = mongoose.model("posts");

const Post = require("../models/post");
const User = require("../models/User");

const createPost = async (req, res) => {
    console.log("//////////////////////////////////////////////////");
    console.log("/////////////////////");
    console.log("/////////////////////");
    console.log(req.cookie);
    console.log("/////////////////////");
    console.log(req.user);

    const { title, content, tags } = req.body;
    console.log("/////////////////////");
    console.log("/////////////////////");
    console.log("/////////////////////");
    console.log("///////////////////////////////////////////////////");

    try {
        const post = await Post.create({
            title,
            content,
            tags,
            _user: req.user.id,
        });
        res.send(post);
    } catch (e) {
        console.log("error");
    }
};

const getPosts = async (req, res) => {
    const { user } = req;

    try {
        const posts = await Post.find({ _user: user.id });
        res.send(posts);
    } catch (e) {
        console.log("error");
    }
};

const deletePost = (req, res) => {
    res.send(req);
};

module.exports = {
    createPost,
    getPosts,
    deletePost,
};
