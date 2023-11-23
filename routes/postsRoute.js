// const express = require("express");

// const router = express.Router();

// const requireLogin = require("../middlewares/requireLogin");

// const {
//     createPost,
//     getPosts,
//     deletePost,
// } = require("../controllers/postsController");

// router.get("/posts", requireLogin, getPosts);

// router.post("/createPost", requireLogin, createPost);

// router.delete("/createPost/:id", requireLogin, deletePost);

// module.exports = router;

////////////////////////////////////
///////////////////////////////
///////////////////////////////////////////

const requireLogin = require("../middlewares/requireLogin");
const {
    createPost,
    getPosts,
    deletePost,
} = require("../controllers/postsController");

module.exports = (app) => {
    app.get("/api/posts", requireLogin(app) , getPosts);

    app.post("/api/createPost", requireLogin(app), createPost);

    app.delete("/api/createPost/:id", requireLogin(app), deletePost);
};
