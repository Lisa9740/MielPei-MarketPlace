const db = require("../../models");
const Order = db.Order;
const ExploitationOrder = db.ExploitationOrder
const Adresse = db.AdresseLivraison;


exports.create = (req, res) => {
    const {adresse, UserId, products, status} = req.body

    let exploitationOrders = [];

    let referenceNumber = Math.random().toString(6).substring(2, 8);

    products.forEach(product => {
        Order.create({
            adresse, UserId, products: {product}, status, reference: referenceNumber,
        }).then(order => {

            ExploitationOrder.create({
                ExploitationId: order.products.product.ExploitationId,
                status: order.status,
                orderId: order.id,
                reference: referenceNumber
            }).then(exploitationOrder => {
                exploitationOrders.push(exploitationOrder)
            })
        })
    })

    return res.status(200).send({message: "Commande crée avec succès" , reference: referenceNumber});


}


exports.getUserOrder = (req, res) => {
    const reference = req.params.userId

    Order.findAll({
        where: {
            reference: reference,
            status: 1
        },
        attributes: ["id", "status", "reference", "products", "createdAt", "adresse"]
    }).then(order => {
        Adresse.findOne({
            where: {
                id: order[0].adresse
            }
        }).then(adresse => {
            return res.status(200).send({order: order, livraison: adresse});
        })

    })

}

exports.getHistoricUserOrder = (req, res) => {
    const userId = req.params.userId

    Order.findAll({
        where: {
            UserId: userId,
        },
        attributes: ["id", "status", "reference", "products", "createdAt", "adresse"]

    }).then(order => {
        return res.status(200).send({order: order});
    })
}

exports.getExploitationOrder = (req, res) => {
    const id = req.params.id

    ExploitationOrder.findAll({
        where: {
            ExploitationId: id,
        },
        attributes: [
            'id',
            'orders',
            'orderId',
            'status'
        ]
    }).then(exploitationOrderData => {
        let orderIds = [];
        exploitationOrderData.forEach(data => {
            orderIds.push(data.orderId)
        })

        Order.findAll({
            where: {id: orderIds},
            attributes: ["id", "status", "reference", "products", "createdAt", "adresse"]
        }).then(orders => {
            return res.status(200).send({order: orders});
        })
    })


}


exports.setUserOrderPaid = (req, res) => {
    const {userId, reference} = req.body

    Order.findAll({
        where: {UserId: userId, reference: reference},
        attributes: ["id", "status", "UserId", "reference", "products", "createdAt", "adresse"]
    }).then(orders => {
        Order.update({status: 2}, {
            where: {
                UserId: userId,
                reference: reference,
                status: 1
            }
        }).then(() => {
            return res.status(200).send({message: 'Votre commande #' + orders[0].reference + ' à bien été pris en compte !'});
        })

    })
}

exports.setOrderFinished = (req, res) => {
    const {id, reference} = req.body

    Order.update({status: 3}, {
        where: {
            id: id,
            reference: reference,
            status: 2
        }

    }).then(data => {
        console.log(data)
        return res.status(200).send({
            message: 'La commande # à bien été pris en compte !'
        });
    })
}
