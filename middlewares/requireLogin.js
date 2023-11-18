module.exports = (req, res, next) => {
    console.log(req.user?.name || "there is no user ")
    if (!req.user) {
        return res.send("you must login");
    }

    next();
};
