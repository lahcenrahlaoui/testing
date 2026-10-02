 
const posts = [
    {
        id: 1,
        title: "First Post",
        content: "This is a hardcoded post.",
        tags: ["test", "demo"],
        userId: 1,
    },
    {
        id: 2,
        title: "Second Post",
        content: "Another hardcoded post.",
        tags: ["example"],
        userId: 1,
    },
];

const createPost = (req, res) => {
    const { title, content, tags } = req.body;

    const post = {
        id: posts.length + 1,
        title,
        content,
        tags,
        userId: 1,
    };

    posts.push(post);

    res.send(post);
};

const getPosts = (req, res) => {
    res.send(posts);
};

const deletePost = (req, res) => {
    const { id } = req.params;

    const index = posts.findIndex((post) => post.id === Number(id));

    if (index === -1) {
        return res.status(404).send({
            message: "Post not found",
        });
    }

    const deletedPost = posts.splice(index, 1);

    res.send(deletedPost[0]);
};

module.exports = {
    createPost,
    getPosts,
    deletePost,
}; 