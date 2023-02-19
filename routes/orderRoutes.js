
const express=require('express')
const router=express.Router();
const {placeOrder}=require('../controllers/orderController')
const {getOrder}=require('../controllers/orderController')
const {getMyOrders}=require('../controllers/orderController')
const {updateOrderToPaid,getAllOrders,updateOrderToDelivered}=require('../controllers/orderController')
const {isAuth,isAdmin}=require('../middlewares/authMiddleware')

router.post('/',isAuth,placeOrder)
router.get('/getOrders',isAuth,isAdmin,getAllOrders)
router.get('/',isAuth,getMyOrders)
router.get('/:id',isAuth,getOrder)
router.put('/:id/pay',isAuth,updateOrderToPaid)
router.put('/:id/deliver',isAuth,isAdmin,updateOrderToDelivered)

module.exports=router

