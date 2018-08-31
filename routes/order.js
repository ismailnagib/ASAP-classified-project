const express = require('express'),
      router = express.Router(),
      OrderController = require('../controllers/orderController')      

router
    .get('/ongoing' , OrderController.orderListPage)
    .get('/completed' , OrderController.completedListPage)
    .get('/' , OrderController.addOrderPage)
    .post('/', OrderController.addingOrder)
    .get('/arrived/:id', OrderController.makeOrderComplete)
    .get('/cancel/:id', OrderController.cancelOrder)
    .get('/rating/:id', OrderController.ratingSet)
    .post('/rating/:id', OrderController.rating)

module.exports = router;