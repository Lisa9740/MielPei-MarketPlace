const db = require("../../models");
const config = require("../../config/authConfig");
const Adresse = db.AdresseLivraison;


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.create = (req, res) => {
  const  { name, adresse, codePostal, commune, telephone, userId } = req.body

    Adresse.create({
        name,
        adresse,
        codePostal,
        commune,
        telephone,
        userId
        }).then(adresse => {
           /* if (!user){
                return res.status(404).send({ message: "User Not found." });
            }*/


        return res.status(200).send(adresse);

    })
}

exports.findByUser = (req, res) => {
    const  userId = req.params.id

    Adresse.findAll({
        attributes: ['id', 'name', 'commune', 'adresse', 'codePostal', 'userId' ]}).then(adresse => {
           return res.status(200).send(adresse);

    })
}
