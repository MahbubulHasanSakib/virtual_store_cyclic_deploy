const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*const orderItemsSchema = new Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
})*/
const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username:{
        type:String
    },
    orderItems: [{
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }
    ],
    paymentMethod: {
        type: String,
        required: true
    },
    shippingAddress: {
        address: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: Number, required: true },
        city: { type: String, required: true },
    },
    paymentResult: {
        id: { type: String },
        status: {type:String },
        updatedAt: { type: Date },
        emailAddress: { type: String }
    },
    tax: {
        type: Number,
        required: true,
        default: 0.0
    },
    shipping_price: {
        type: Number,
        required: true,
        default: 0.0
    },
    total_price: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }

}, { timestamps: true })
const Order = mongoose.model('order', orderSchema)
module.exports = Order