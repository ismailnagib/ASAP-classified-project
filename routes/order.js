const express = require('express'),
      router = express.Router(),
      OrderController = require('../controllers/orderController')
      

router
    .get('/' , OrderController.orderListPage)

    .get('/completed' , OrderController.completedListPage)

    .get('/add' , OrderController.addOrderPage)

    .post('/add', OrderController.addingOrder)

    .get('/arrived/:id', OrderController.makeOrderComplete)

    .get('/cancel/:id', OrderController.cancelOrder)



module.exports = router;