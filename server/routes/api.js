var express = require('express');
var router = express.Router();

const users = require("../controllers/Admin/userController.js");
const products = require("../controllers/Producteurs/productController.js");


router.get('/users', users.findAll)

router.get('/products', products.findAll)


module.exports = router;