var express = require('express');
var router = express.Router();
var db = require('../db');
router.get('/', function (req, res, next) {
    console.log(req.query)
    // res.send("Deposit set for now")
    let action = req.query.action
    let amount = req.query.amount
    if (action == "deposit") {
        console.log("in deposit")
        //updateDB add Dollar amount into account
        db.get('SELECT balance AS id, * FROM users WHERE username = ?;', [req.user.username], function (err, row) {
            if (err) { return next(err) }
            let newAmount = row.balance;
            if (newAmount == null) {
                newAmount = 0;
            }
            newAmount = parseInt(newAmount);
            newAmount = newAmount + parseInt(amount);
            console.log("adding: " + newAmount)
            db.run('UPDATE users SET balance = ? WHERE username = ?;', [
                newAmount,
                req.user.username
            ], function (err) {
                if (err) { return next(err); }
                return res.render('index', { data: newAmount, user: req.user })
            });
        })
    } else if (action == "withdraw") {
        db.get('SELECT balance AS id, * FROM users WHERE username = ?;', [req.user.username], function (err, row) {
            if (err) { return next(err) }
            let newAmount = row.balance;
            if (newAmount == null) {
                newAmount = 0;
            }
            newAmount = parseInt(newAmount);
            newAmount = newAmount - parseInt(amount);
            if(newAmount<0)
            {
                return res.send("Insufficient funds")
            }
            console.log("subtr: " + newAmount)
            db.run('UPDATE users SET balance = ? WHERE username = ?;', [
                newAmount,
                req.user.username
            ], function (err) {
                if (err) { return next(err); }
                return res.render('index', { data: newAmount, user: req.user })
            });
        })
    } else if (action == "balance") {
        db.get('SELECT balance AS id, * FROM users WHERE username = ?;', [req.user.username], function (err, row) {
            if (err) { return next(err) }
            let newAmount = row.balance;
            if (newAmount == null) {
                newAmount = 0;
            }
            newAmount = parseInt(newAmount);
            return res.render('index', { data: newAmount, user: req.user })
        })
    } else if (action == "close") {
        console.log("close")
        db.run('DELETE FROM users WHERE username = ?', [
            req.user.username
        ], function (err) {
            if (err) { return next(err); }
            req.logout();
            return res.render('login')
        });
    }
    else {
        return res.redirect('/blue');
    }

});

module.exports = router;
