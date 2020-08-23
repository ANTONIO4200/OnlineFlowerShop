const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')

//ZADATAK: vrati login stranicu
router.get('/', function (req, res, next) {

    res.render('login', {
        title: 'Login',
        linkActive: 'login',
        user: req.session.user,
        err: undefined
    });
});

//ZADATAK: postupak prijave korisnika
router.post('/', function (req, res, next) {

    (async () => {
        let user = await User.fetchByUsername(req.body.user)
        let isPersisted = user.isPersisted()

        if (!isPersisted) {
            // ako korisnik ne postoji
            res.render('login', {
                title: 'Login',
                linkActive: 'login',
                user: req.session.user,
                err: "User doesn't exist"
            });
        } else {
            if (user.checkPassword(req.body.password)) {
                // ako je lozinka tocna
                req.session.user = user
                res.redirect("/")
            } else {
                res.render('login', {
                    title: 'Login',
                    linkActive: 'login',
                    user: req.session.user,
                    err: "Password incorrect"
                });
            }
        }
    })()
});


module.exports = router;