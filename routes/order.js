const express = require('express'),
      router = express.Router(),
      OrderModel = require('../models').Order,
      PackageModel = require('../models').Package

router
    .get('/ongoing' , function(req,res) { // gw rubah dari /order jadi /order/ongoing // - ISMAIL
        OrderModel.findAll({
            order: [['id','ASC']],
            include: [{model: PackageModel}],
            where: {
                UserId: 1, // Nanti di ganti jadi dinamis
                isCompleted: false
            }
        })
        .then( orders => {
            // var yo = new Date().toLocaleTimeString()
            // res.send(orders[0].deliveredTime.toDateString())
            
            // console.log(orders);
            // res.send(orders)
            res.render('orderlist-progress', {orders: orders})
        })
        .catch(err => {
            console.log(err)
            res.send(err.message)
            
        })
    })

    .get('/completed' , function(req,res) {
        OrderModel.findAll({
            order: [['id','ASC']],
            include: [{model: PackageModel}],
            where: {
                UserId: 2, // Nanti di ganti jadi dinamis
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
    })

    .get('/' , function(req,res) { // gw rubah dari /order/add jadi /order // - ISMAIL
        if (req.session.user) {
            res.render('order-add', {name: req.session.user.name})
        } else {
            res.redirect('/auth')
        }
        // INI GW RUBAH, BIAR ORDER-ADD NYA JADI HALAMAN UTAMA SAMA KALO BELOM LOGIN DI REDIRECT KE /AUTH // - ISMAIL
    })

    .post('/', function(req,res) { // gw rubah dari /order/add jadi /order // - ISMAIL
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
                res.redirect('/order/ongoing') // gw pindahin ke /order/ongoing // - ISMAIL
            })
        })
        .catch(err => {
            console.log(err);
            res.send(err.message)
            
        })
    })

    .get('/arrived/:id', function(req,res) {
        OrderModel.update({
            isCompleted: true,
            arrivedTime: new Date
        },{
            where: {
                id: req.params.id
            }
        })
        .then( () => {
            res.redirect('/order/ongoing') // gw pindahin ke /order/ongoing // - ISMAIL
        })
        .catch(err => {
            console.log(err);
            res.send(err.message)
        })
    })

    .get('/cancel/:id', function(req,res) {
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
                res.redirect('/order/ongoing') // gw pindahin ke /order/ongoing // - ISMAIL
            })
        })
        .catch(err => {
            console.log(err);
            res.send(err.message)          
        })

    })



module.exports = router;