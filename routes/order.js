const express = require('express'),
      router = express.Router(),
      OrderModel = require('../models').Order,
      PackageModel = require('../models').Package
      

router
    .get('/' , function(req,res) {
        OrderModel.findAll({
            order: [['id','ASC']],
            include: [{model: PackageModel}]
        })
        .then( orders => {
            // res.send(orders.Package)
            res.render('orderlist-progress', {orders: orders})
        })
        // res.render('orderlist-progress')
    })

    .get('/add' , function(req,res) {
       res.render('order-add.ejs')
        // res.render('orderlist-progress')
    })

    .post('/add', function(req,res) {
        let data = req.body;

        var price = data.size * data.weight * 1000
        if (data.isFragile === 'true') {
            price += 50000
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
        .then( order => {
            PackageModel.create({
                size: data.size,
                weight: data.weight,
                isFragile: data.isFragile
            })
            .then( package => {
                res.redirect('/order')
            })
        })
        .catch(err => {
            console.log(err);
            res.send(err)
            
        })
    })


module.exports = router;