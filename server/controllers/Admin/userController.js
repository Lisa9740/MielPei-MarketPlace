const db = require("../../models");
const User = db.User
const Role = db.Role
const bcrypt = require("bcryptjs");
/*const Op = db.Sequelize.Op;*/


exports.create = (req, res) => {
    const {firstName, lastName, email, isActive, roleId} = req.body
    User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        RoleId : roleId,
        password: bcrypt.hashSync('test', 8),
        isActive: isActive
    })
        .then(user => {
            if (user){
                res.status(200).send({ message : 'Utilisateur crée'});
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.edit = (req, res) => {
    const {firstName, lastName, email, isActive, roleId, userId} = req.body
    User.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        roleId: roleId,
        password: bcrypt.hashSync('test', 8),
        isActive: isActive
    },{where : {
         id : userId
        }
    })
        .then(user => {
            if (user){
                res.status(200).send({ message : 'Utilisateur modifié'});
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Retrieve all Computers from the database.
exports.findAll = (req, res) => {
    User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'isActive' , 'RoleId'],
        include: [
            {
                model: Role,
                attributes: ['id', 'name'],
            }

        ]
    }).then(data => {
         res.status(200).json(data);
    });
};


