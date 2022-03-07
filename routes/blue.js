var express = require('express');
var router = express.Router();
var manageRouter = require("../routes/manage")
router.use("/", manageRouter);
router.get('/', function (req, res, next) {
 res.send("Home page before requests")
});
router.get('/register', function (req, res, next) {
    res.send("Register")
});
router.get('/login', function (req, res, next) {
    res.send("Login")
});
router.get('/manage', function (req, res, next) {
    res.send("Manage")
});
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
module.exports = router;
