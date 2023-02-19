const express=require('express')
const router=express.Router()
const { v4: uuidv4 } = require('uuid')
const multer=require('multer')
const {fetchProducts,productDetails,deleteProduct,addProduct,updateProduct,
addReview}= require('../controllers/productController')
const {isAuth,isAdmin}=require('../middlewares/authMiddleware')
const path = require('path');
const inMemoryStorage=multer.memoryStorage()

/*const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'public/uploads');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now()+path.extname(file.originalname));
    }
});


 const upload = multer({ storage });*/
 


const upload = multer({ storage: inMemoryStorage });

router.get('/',fetchProducts)
/*router.post('/search',searchProducts)*/
router.post('/addProduct',isAuth,isAdmin,upload.single('productImage'),addProduct)
router.get('/:id/delete',isAuth,isAdmin,deleteProduct)
router.put('/:id/update',isAuth,isAdmin,upload.single('productImage'),updateProduct)
router.post('/:id/reviews',isAuth,addReview)
router.get('/:id',productDetails)


module.exports=router