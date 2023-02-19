const express=require('express')
const router=express.Router()
const {isAuth,isAdmin}=require('../middlewares/authMiddleware')

const {login,register,userProfile,updateProfile,getAllUsers,deleteUser,
    updateUser,getUser}=require('../controllers/userController')


router.get('/',isAuth,isAdmin,getAllUsers)
router.post('/login',login)
router.post('/register',register)
router.get('/userProfile',isAuth,userProfile)
router.post('/updateProfile',isAuth,updateProfile)
router.get('/:id/delete',isAuth,isAdmin,deleteUser)
router.put('/:id/update',isAuth,isAdmin,updateUser)
router.get('/:id',isAuth,isAdmin,getUser)
module.exports=router