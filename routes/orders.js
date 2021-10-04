const {Order} = require('../models/order');
const {OrderItem} = require('../models/order-item')
const express = require('express');
const router = express.Router();

//get all orders
router.get(`/`, async (req, res) =>{
    try {
        const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

        if(!orderList) {
            res.status(500).json({success: false})
        } 
        res.send(orderList);
    } catch(err) {
        res.status(400).json({ success: false, error: err });
    }
});

//get one orders
router.get(`/:id`, async (req, res) =>{
    try {
        const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'}
            });

        if(!order) {
            res.status(500).json({success: false})
        } 
        res.send(order);
    } catch(err) {
        res.status(400).json({ success: false, error: err });
    }
});

//update order status with specific id
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {
            status: req.body.status,
        }, {new: true}); //to get the new updated data otherwise old object would be returned
        if (!order)
        return res.status(400).json({success: false, message: "the category cannot be update"});

        res.send(order);
    } catch (err) {
        res.status(400).json({success: false, error: err});
    }
})

//post an order
router.post('/', async (req, res) => {
    //first we will save the orderItems and then return only ids
    //Promise.all to resolve all the promises as we are returning multiple promises
    const orderItemIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }));
    const orderItemsIdsResolved = await orderItemIds;

    //getting total prices of individual products
    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async orderItemId => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }));
    //getting total price of whole order
    const totalPrice = totalPrices.reduce((a,b) => a + b, 0);
    try {
        let order = Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: totalPrice,
            user: req.body.user,
        });
        order = await order.save();
    
        if (!order) {
            return res.status(404).send('the order cannot be created!');
        }
        res.send(order);
    } catch(err) {
        res.status(400).json({ success: false, error: err });   
    }
});

//delete a order with specific id
router.delete('/:id', async (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem);
            })
            return res.status(200).json({ success: true, message: "the order is deleted!" });
        } else {
            return res.status(404).json({ success: false, message: "order not found!" });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    })
});

//get total sales of store
router.get('/get/totalsales', async (req, res) => {
    try {
        //we have included _id because mongodb cannot return any object without id
        const totalSales = await Order.aggregate([
            {$group: {_id: null, totalSales: {$sum: '$totalPrice'}}}
        ]);
        if(!totalSales) {
            return res.status(400).json({ success: false, message: "Total sales cannot be generated" }); 
        }

        res.send({totalSales: totalSales.pop().totalSales});
    } catch(err) {
        res.status(400).json({ success: false, error: err });   
    }
});

//get total number of order
router.get('/get/count', async (req, res) => {
    try {
        let orderCount = await Order.countDocuments();
        if(!orderCount) {
            res.status(500).json({success: false, message: "No product found"});
        }
        res.send({orderCount: orderCount});
    } catch(err) {
        res.status(400).json({ success: false, error: err });
    }
});

//get all orders of specific user
router.get(`/get/userorder/:userid`, async (req, res) =>{
    try {
        const userOrderList = await Order.find({user: req.params.userid}).populate({
            path: 'orderItems', populate: {
                path: 'product', populate: 'category'}
            }).sort({'dateOrdered': -1});

        if(!userOrderList) {
            res.status(500).json({success: false})
        } 
        res.send(userOrderList);
    } catch(err) {
        res.status(400).json({ success: false, error: err });
    }
});

module.exports =router;