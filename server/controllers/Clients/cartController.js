const db = require("../../models");
const config = require("../../config/authConfig");
const User = db.User;
const Cart = db.Cart;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.cart = (req, res) => {
    const id = req.params.id

    User.findOne({where :{
        id: id,
    }}).then(user => {
        if (!user){
            return res.status(404).send({ message: "User Not found." });
        }

        Cart.findOne({
            where: {
                id : user.cartId
            }}).then(cart => {
                res.status(200).send({
                    cart : cart.products
                })

            })



    })
}

