
const express=require('express')
const router=express.Router();
const {isAuth}=require('../middlewares/authMiddleware')
const {shipping}=require('../controllers/shippingController')

router.post('/',isAuth,shipping)

module.exports=router

