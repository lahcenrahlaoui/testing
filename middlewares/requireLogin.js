module.exports = (req, res, next) => {
    console.log("req.user++++++++++++++++++++++++");
    console.log("req.user++++++++++");
    console.log(req.isAuthenticated());
    console.log("req.user++++++++");
    console.log(req.user);

    if (!req.user) {
        console.log("you must login ");
        return res.send("you must login");
    }

    next();
};
