var express = require('express');
var router = express.Router();
var manageRouter = require("../routes/manage")
var authRouter = require("../routes/auth")
router.use("/manage", manageRouter);
router.use("/auth", authRouter);

router.get('/', function (req, res, next) {
    res.send("Home page before requests")
});
router.get('/signup', function (req, res, next) {
    res.render('signup');
});
router.get('/login', function (req, res, next) {
    res.render('login');
});
router.get('/manage', function (req, res, next) {
    res.render('index', { user: req.user });
});
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
module.exports = router;