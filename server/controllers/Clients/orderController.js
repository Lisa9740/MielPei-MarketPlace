const db = require("../../models");
const config = require("../../config/authConfig");
const Order = db.Order;
const Adresse = db.AdresseLivraison;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.create = (req, res) => {
    const  { adresse, userId, products, status } = req.body

    Order.create({
        adresse, userId, products, status
    }).then(adresse => {
        /* if (!user){
             return res.status(404).send({ message: "User Not found." });
         }*/

        return res.status(200).send(adresse);
    })
}

exports.getUserOrder = (req, res) => {
    const userId  = req.params.userId

    Order.findOne({
        where : {
            userId: userId,
            status: 1
        }
    }).then( order => {
        Adresse.findOne({
            where : {
                id :order.adresse
            }
        }).then( adresse => {
            return res.status(200).send({order : order, livraison : adresse});
        })

    })

}

exports.setUserOrderPaid = (req, res) => {
    const {userId}  = req.body

    Order.update({ status : 2},{
        where : {
            userId: userId,
            status: 1
        }
    }).then(() => {
        Order.findOne({ where: { userId: userId}}).then( order => {
            return res.status(200).send({ message: 'Votre commande #' + order.id + ' à bien été pris en compte !'}  );
        })
    })

}

