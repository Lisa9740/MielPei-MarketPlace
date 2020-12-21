const db = require("../../models");
const config = require("../../config/authConfig");
const Order = db.Order;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.create = (req, res) => {
    const  { adresse, userId, products } = req.body

    Order.create({
        adresse, userId, products
    }).then(adresse => {
        /* if (!user){
             return res.status(404).send({ message: "User Not found." });
         }*/


        return res.status(200).send(adresse);

    })
}

