var express = require('express');
var router = express.Router();

const users = require("../controllers/Admin/userController.js");


router.get('/users', users.findAll)


module.exports = router;