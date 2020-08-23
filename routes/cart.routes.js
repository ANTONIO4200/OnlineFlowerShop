const express = require('express');
const router = express.Router();
const cart = require('../models/CartModel')


//ZADATAK prikaz košarice uz pomoć cart.ejs
router.get('/', function (req, res, next) {

    (async () => {

        if (req.session.cart === undefined || req.session.cart.invalid) {
            req.session.cart = await cart.createCart()
        }

        res.render('cart', {
            title: 'Cart',
            linkActive: 'cart',
            user: req.session.user,
            err: undefined,
            cart: req.session.cart
        });
    })()

});

//ZADATAK: dodavanje jednog artikla u košaricu
router.get('/add/:id', function (req, res, next) {

    (async () => {
        if (req.session.cart === undefined)
            req.session.cart = cart.createCart()

        await cart.addItemToCart(req.session.cart, req.params.id, 1)
        res.end()
    })()
});

//ZADATAK: brisanje jednog artikla iz košarice
router.get('/remove/:id', function (req, res, next) {

    (async () => {
        await cart.removeItemFromCart(req.session.cart, req.params.id, 1)
        res.end()
    })()
});

// LABOS ZADATAK
router.get('/removeAll/:id', function (req, res, next) {

    (async () => {
        await cart.removeItemFromCart(req.session.cart, req.params.id, req.session.cart.totalAmount)
        res.end()
    })()
})

module.exports = router;