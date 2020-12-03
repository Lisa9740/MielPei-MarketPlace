const db = require("../../models");
const User = db.User
const Role = db.Role

/*const Op = db.Sequelize.Op;*/

// Retrieve all Computers from the database.
exports.findAll = (req, res) => {
    User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'roleId'],
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
