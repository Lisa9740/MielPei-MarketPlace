const db = require("../models");
const config = require("../config/authConfig");
const User = db.User;
const Cart = db.Cart;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.login = (req, res) => {
    const {email} = req.body

    User.findOne({
        where: {
            email
        }}
    ).then(user => {
        if (!user){
            return res.status(404).send({ message: "User Not found." });
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.json({
                    message: "Auth failed. Check email and password"
                });
            }

            if (result){
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });

                res.status(200).send({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roleId: user.roleId,
                    token : token
                });
            }

        });


    })
}

exports.register = (req, res) => {
    // TODO : création d'un panier lors de l'enregistrement d'un utilisateur
    const {cartProducts} = req.body
    // Save User to Database
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        roleId : 2,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (user){
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });
                res.status(200).send({
                    id: user.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    token : token
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};