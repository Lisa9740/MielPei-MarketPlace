const db = require("../../models");
const Adresse = db.AdresseLivraison;


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
            return res.status(200).send(adresse);
    })
}

exports.findByUser = (req, res) => {
    Adresse.findAll({
        attributes: ['id', 'name', 'commune', 'adresse', 'codePostal', 'UserId' ]}).then(adresse => {
           return res.status(200).send(adresse);

    })
}
