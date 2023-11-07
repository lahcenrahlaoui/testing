const passport = require("passport");

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.send({ msg: "hi" });
    });
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );

    app.get("/auth/google/callback", passport.authenticate("google"));

    app.post('/api/logout', function(req, res, next){
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });

    app.get("/api/current_user", (req, res) => {
        res.send({wx : req['user'] , x:"s"});
    });
};
