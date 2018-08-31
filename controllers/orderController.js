const OrderModel = require('../models').Order,
      PackageModel = require('../models').Package,
      CourierModel = require('../models').Courier

class OrderController {
    static orderListPage(req,res) {
        if (req.session.user) {
            OrderModel.findAll({
                order: [['id','ASC']],
                include: [{model: PackageModel}],
                where: {
                    UserId: 1, // Nanti di ganti jadi dinamis
                    isCompleted: false
                }
            })
            .then( orders => {
                res.render('orderlist-progress', {orders: orders})
            })
            .catch(err => {
                console.log(err)
                res.send(err.message)
                
            })
        } else {
            res.redirect('/auth')
        }
    }

    static completedListPage(req,res) {
        if (req.session.user) {
            OrderModel.findAll({
                order: [['id','ASC']],
                include: [{model: PackageModel}],
                where: {
                    UserId: 1, // Nanti di ganti jadi dinamis
                    isCompleted: true
                }
            })
            .then( orders => {
                res.render('orderlist-completed', {orders: orders})
            })
            .catch(err => {
                console.log(err)
                res.send(err.message)
                
            })
        } else {
            res.redirect('/auth')
        }
    }

    static addOrderPage (req,res) {
        if (req.session.user) {
            res.render('order-add.ejs')
        } else {
            res.redirect('/auth')
        }
    }

    static addingOrder(req,res) {
        let data = req.body;

        var price = data.size * data.weight * 700
        if (data.isFragile === 'true') {
            price += 30000
        }

        OrderModel.create({
            UserId: null,
            CourierId: null,
            PackageId: null,
            price: price,
            isCompleted: false,
            createdAt: new Date,
            updatedAt: new Date,
            deliveredTime: new Date

        })
        .then( () => {
            PackageModel.create({
                size: data.size,
                weight: data.weight,
                isFragile: data.isFragile
            })
            .then( () => {
                res.redirect('/order')
            })
        })
        .catch(err => {
            console.log(err);
            res.send(err.message)

        })
    }

    static makeOrderComplete(req,res) {
        OrderModel.update({
            isCompleted: true,
            arrivedTime: new Date
        },{
            where: {
                id: req.params.id
            }
        })
        .then( () => {
            res.redirect('/order')
        })
        .catch(err => {
            console.log(err);
            res.send(err.message)
        })
    }

    static cancelOrder(req,res) {
        OrderModel.destroy({
            where: {
                id : req.params.id
            }
        }) 
        .then( () => {
            PackageModel.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then( () => {
                res.redirect('/order')
            })
        })
        .catch(err => {
            console.log(err);
            res.send(err.message)          
        })
    }

    static rating(req, res) {
        OrderModel.findById(req.params.id, {include: []})

    }
}


module.exports = OrderController;