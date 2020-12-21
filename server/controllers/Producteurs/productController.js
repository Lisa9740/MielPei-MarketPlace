const db = require("../../models");
const Product = db.Product
const Exploitation = db.Exploitation
const Role = db.Role

/*const Op = db.Sequelize.Op;*/

// Retrieve all Computers from the database.
exports.findAll = (req, res) => {
    Product.findAll({
        attributes: ['id', 'name','price', 'quantity', 'description', 'exploitationId'],
        include: [
            {
                model: Exploitation,
                attributes: ['id', 'commune'],
            }

        ]
    }).then(data => {
        res.status(200).json(data);
    });

};
