var express = require('express');
var router = express.Router();

const users = require("../controllers/Admin/userController.js");
const products = require("../controllers/Producteurs/productController.js");
const cart = require("../controllers/Clients/cartController.js");
const adresse = require("../controllers/Clients/adresseController.js");
const order = require("../controllers/Clients/orderController.js")


router.get('/users', users.findAll)

router.post('/livraison', adresse.create)

router.get('/:id/livraison', adresse.findByUser)


router.get('/products', products.findAll)

router.get('/:id/cart', cart.cart);

router.post('/order', order.create);

router.get("/:userId/order", order.getUserOrder);

router.post('/order/payment', order.setUserOrderPaid);

module.exports = router;