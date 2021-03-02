var express = require('express');
var router = express.Router();

const users = require("../controllers/Admin/userController.js");
const products = require("../controllers/Producteurs/productController.js");
const cart = require("../controllers/Clients/cartController.js");
const adresse = require("../controllers/Clients/adresseController.js");
const order = require("../controllers/Clients/orderController.js")
const exploitations = require('../controllers/Producteurs/exploitationsController.js')


router.get('/users', users.findAll)

router.post('/user/create', users.create)

router.post('/user/edit', users.edit)

router.post('/livraison', adresse.create)

router.get('/:id/livraison', adresse.findByUser)

router.get('/products', products.findAll)

router.post('/products/create', products.create)

router.post('/products/edit', products.edit)

router.get('/:id/cart', cart.cart);

router.get('/:userId/order/history', order.getHistoricUserOrder);

router.post('/order', order.create);

router.get("/:userId/order", order.getUserOrder);

router.post('/order/payment', order.setUserOrderPaid);

router.get('/exploitations', exploitations.findAll);

router.get('/exploitations/:id/orders', order.getExploitationOrder);

router.post('/exploitations/create', exploitations.create);

router.get('/exploitations/:id', exploitations.findOne);

router.get('/exploitations/:userId/datas', exploitations.findByUser);




module.exports = router;