const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const cloudinary=require('../utlis/cloudinary')
const path=require('path')


const DatauriParser=require("datauri/parser");
const parser = new DatauriParser();

const addReview=asyncHandler(async (req, res) => {
    const {rating,comment}=req.body;
    console.log(req.body)
    try {
          const product=await Product.findById(req.params.id)
          if(product)
          {
              const findAlreadyReviewed= product.reviews.find((r)=>r.user.toString()===req.user._id.toString())
              console.log(findAlreadyReviewed)
              console.log(req.user._id)
              if(findAlreadyReviewed)
              return res.status(401).send('You have already reviewed')
              else{
                const review={
                    name:req.user.name,
                    user:req.user._id,
                    rating:Number(rating),
                    comment:comment
                }
                product.reviews.push(review)
                product.rating=(product.reviews.reduce((acc,r)=>acc+r.rating,0))/product.reviews.length;
                product.numReviews=product.reviews.length;
                const updatedProduct =await product.save()
                return res.send(updatedProduct)
            }

          }
          else return res.status(401).send('Product not found')
    } catch (error) {
         return res.status(404).send('Server error '+error)
    }
})

const fetchProducts = asyncHandler(async (req, res) => {

    try {
       console.log("ok")
        const searchText=req.query.searchText?{
         name:{
             $regex:req.query.searchText,
             $options:'i'
         }
        }:{}
        const products = await Product.find({...searchText})
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})



/*const searchProducts = asyncHandler(async (req, res) => {
    const {txt} =req.body;
    try{
 const products = await Product.find({$text: {$search: txt}})
   return res.send(products)
   }
   catch(error){
     return  res.status(404).send("Something error"+error.message)
   }
})*/

const productDetails = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.send(product)
    } catch (error) {
        console.log(error)
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, brand, countInStock, category, description } = req.body
    console.log(req.body)
    console.log(req.file)
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            let imagePath;
            if (req.file){
            // imagePath = String('/' + req.file.destination.split('/').slice(1) + '/' + req.file.filename);
            const extName = path.extname(req.file.originalname).toString();
                 const file64 = parser.format(extName, req.file.buffer);
                 const result = await cloudinary.uploader.upload(file64.content,{
                     uploads: "products",
                     // width: 300,
                     // crop: "scale"
                     public_id: `${Date.now()}`,
                     resource_type: "image",
                 })
             imagePath=result.secure_url;
            }
            else  imagePath = product.image
            console.log(req.body)
            product.name = req.body.name || product.name
            product.price = req.body.price || product.price
            product.image = imagePath
            product.countInStock = req.body.countInStock || product.countInStock
            product.category = req.body.category || product.category
            product.description = req.body.description || product.description

            const updatedProduct = await product.save();
            console.log(updatedProduct)
            res.send(updatedProduct)
        }
        else {
            res.status(401).send('Product not found')
        }
    }
    catch (error) {
        return res.status(404).send('Something error')
    }
})


const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.id)
        return res.send(deletedProduct)
    }
    catch (error) {
        return res.status(401).send('Something error')
    }
})



const addProduct = asyncHandler(async (req, res) => {
    const { name, price, brand, countInStock, category, description } = req.body
    console.log(req.body)
    console.log(req.file)
    const product = await Product.findOne({ name });
    if (product) {
        return res.status(401).send('This product is already added');
    }
    else {
       // const imagePath = String('/' + req.file.destination.split('/').slice(1) + '/' + req.file.filename);
       const extName = path.extname(req.file.originalname).toString();
                 const file64 = parser.format(extName, req.file.buffer);
                 const result = await cloudinary.uploader.upload(file64.content,{
                     uploads: "products",
                     // width: 300,
                     // crop: "scale"
                     public_id: `${Date.now()}`,
                     resource_type: "image",
                 })
    const imagePath=result.secure_url;
        const newProduct = new Product({
            name,
            price,
            image: imagePath,
            brand,
            countInStock,
            category,
            description
        });
        await newProduct.save()
            .then(p => {
                return res.send(p)
            })
            .catch(err => {
                return res.status(401).send('Server error');
            });
    }

})

module.exports = { fetchProducts, productDetails, deleteProduct, addProduct, updateProduct,
addReview }