const db = require("../../models");
const Product = db.Product
const Exploitation = db.Exploitation
const Role = db.Role


exports.create = (req, res) => {
    const { name, price, description, inStock ,exploitationId } = req.body
    Product.create({
        name : name,
        price : price,
        inStock: inStock,
        description : description,
        ExploitationId : exploitationId,
        quantity : 1
    }).then(data => {
        res.status(200).json(data);
    });

};

exports.edit = (req, res) => {
    const { id, name, price, description, inStock, exploitationId } = req.body
    Product.update({
        name : name,
        price : price,
        inStock: inStock,
        description : description,
        ExploitationId : exploitationId,
        quantity : 1
    }, {
        where: {
            id : id
        }
    }).then(data => {
        res.status(200).json(data);
    });

};

// Retrieve all Computers from the database.
exports.findAll = (req, res) => {
    Product.findAll({
        attributes: ['id', 'name','price', 'quantity', 'description', 'ExploitationId'],
        include: [
            {
                model: Exploitation,
                attributes: ['id', 'name' , 'commune'],
            }

        ]
    }).then(data => {
        res.status(200).json(data);
    });

};
