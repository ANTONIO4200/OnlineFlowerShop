const express = require('express');
const router = express.Router();

//ZADATAK:
// - obrisati sadržaj košarice
// - odjaviti registriranog korisnika iz sustava
// - napraviti redirect na osnovnu stranicu
router.get('/', function (req, res, next) {

    req.session.destroy()

    res.redirect("/")
});

module.exports = router;