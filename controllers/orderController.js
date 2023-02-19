const Order = require('../models/orderModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const stripe = require('stripe')("sk_test_51KI7u4AYcKCeJe3FH2DjsBGpMJXHqICf9aVyQJkJygbDV3yPjDhgXG24v6Z9mDFyQutmIykbI1xZQ3dHOpAI0eJq00oOpXjSH7")


const placeOrder = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        console.log(req.body)
        const newOrder = new Order({ ...req.body })
        await newOrder.save()
            .then((odr) => { return res.send(odr) })
            .catch((err) => { return res.status(401).send('Server Error') })

    }
    else {
        res.status(404).send('User not found')
    }
})

const getOrder = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        const order = await Order.findById(req.params.id)
        if (order) {
            res.send(order)
        }
        else {
            res.status(404).send('Order not found')
        }
    }
    else {
        res.status(404).send('User not found')
    }
})


const getMyOrders = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        const order = await Order.find({ user: req.user._id })
        if (order) {
            res.send(order)
        }
        else {
            res.status(404).send('Order not found')
        }
    }
    else {
        res.status(404).send('User not found')
    }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {

    const { token, amount, user, orderId } = req.body
    const order = await Order.findById(orderId);
    console.log(order)
    console.log(Math.round(amount * 100))
    if (order) {
        try {
            const customer = await stripe.customers.create({
                email: token.email,
                source: token.id
            })

            const payment = await stripe.charges.create({
                amount: Math.round(amount * 100),
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email
            }, {
                idempotencyKey: uuidv4()
            })

            if (payment) {

                console.log(payment)
                order.isPaid = true
                order.paidAt = Date.now()
                order.paymentResult = {
                    id: payment.id,
                    status: payment.status,
                    updatedAt: payment.created,
                    emailAddress: payment.receipt_email
                }
                const updatedOrder = await order.save()
                res.send(updatedOrder)

            }
            else {
                res.status(404).send('Payment Failed')
            }
        } catch (error) {
            res.status(401).send('Something error ' + error)
        }
    }
    else {
        return res.status(401).send('Order not found')
    }
})

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
    res.send(orders)
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {

    const { orderId } = req.body
    const order = await Order.findById(orderId);
    if (order) {
        try {
            order.isDelivered= true;
            order.deliveredAt = Date.now();
            const updatedOrder = await order.save()
            res.send(updatedOrder)

        }

        catch (error) {
            res.status(401).send('Something error ' + error)
        }
    }
    else {
        return res.status(401).send('Order not found')
    }
})
module.exports = { placeOrder, getOrder, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered, }