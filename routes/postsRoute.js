const requireLogin = require("../middlewares/requireLogin");
const {
    createPost,
    getPosts,
    deletePost,
} = require("../controllers/postsController");
const Post = require("../models/post");

module.exports = (app) => {
    app.get("/api/posts", requireLogin, getPosts);

    app.post("/api/createPost", requireLogin, createPost);
    // app.post(
    //     "/api/createPost",
    //     (req, res, next) => {
    //         console.log(req);
    //         next();
    //     },
    //     async (req, res) => {
    //         const { title, content, tags } = req.body;
    //         try {
    //             const post = await Post.create({
    //                 title,
    //                 content,
    //                 tags,
    //                 _user: req.user.id,
    //             });
    //             res.send(post);
    //         } catch (e) {
    //             console.log("error");
    //         }
    //     }
    // );

    app.delete("/api/createPost/:id", requireLogin, deletePost);
};
