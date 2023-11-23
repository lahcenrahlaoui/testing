module.exports = (app) => (req, res, next) => {
    console.log(app);
    if (!req.user) {
        console.log("you must login ");
        return res.send("you must login");
    }

    next();
};
