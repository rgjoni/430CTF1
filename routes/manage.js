var express = require('express');
var router = express.Router();
router.get('/action', function (req, res, next) {
    res.send("Deposit set for now")
    let action = "deposit"
    if(action == "deposit")
    {
        //updateDB add Dollar amount into account
    }
});

module.exports = router;
