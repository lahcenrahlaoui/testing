 const {
    createPost,
    getPosts,
    deletePost,
} = require("../controllers/postsController");
 
module.exports = (app) => {
    app.get("/api/posts",   getPosts);

    app.post("/api/createPost",   createPost);
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

    app.delete("/api/createPost/:id",  deletePost);
};
