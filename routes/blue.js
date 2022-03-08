var express = require('express');
var router = express.Router();
var manageRouter = require("../routes/manage")
var authRouter = require("../routes/auth")
router.use("/manage", manageRouter);
router.use("/", authRouter);

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.user) { return res.render('login'); }
    res.render('index', { user: req.user, data: 0 });
});

router.get('/signup', function (req, res, next) {
    res.render('signup');
});
router.get('/login', function (req, res, next) {
    res.render('login');
});
// router.get('/manage', function (req, res, next) {
//     res.render('index', { user: req.user });
// });
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
module.exports = router;