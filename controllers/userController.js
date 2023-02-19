const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const login=asyncHandler(async(req,res)=>
{
    const {email,password}=req.body;
    
    const user=await User.findOne({email});
    if(!user)
    {
        res.status(401).send('This email is not registered');
    }
    else
    {
        const isMatched= await bcrypt.compare(password,user.password);
        if(isMatched)
        {
            const generatedToken=jwt.sign({id:user._id},process.env.JWTSECRET,{
                expiresIn:'10d'
            })
            res.json({
              _id:user._id,
              name:user.name,
              email:user.email,
              isAdmin:user.isAdmin,
              token:generatedToken
            })
        }
        else
        {
            return res.status(401).send('Email or password is wrong');
        }
    }

})
 const register=async(req,res)=>
{
    const {name,email,password}=req.body;
  
    const user=await User.findOne({email});
    if(user)
    {
       return res.status(401).send('This user is already registered');
    }
    else{
    const hashedPassword=await bcrypt.hash(password,10);
    const newuser=new User({
    name,
    email,
    password:hashedPassword,
    isAdmin:false
    });
     await newuser.save()
    .then(user=>{
        return res.send(user)
    })
    .catch(err=>{
        return res.status(401).send('Server error');
    });
}
}

const userProfile=asyncHandler(async(req,res)=>
{
     const user=await User.findById(req.user._id)
     if(user)
     return res.send(user)
     else{
         res.status(404).send('User not found')
     }
  
})
const updateProfile=asyncHandler(async(req,res)=>
{
    const user=await User.findById(req.user._id)
    if(user)
    {
        user.name=req.body.name||user.name;
        user.email=req.body.email||user.email
        if(req.body.password)
        {
            user.password=await bcrypt.hash(req.body.password,10);
        }
        const updatedUser=await user.save();
        res.send(updatedUser)
    }
    else{
        res.status(404).send('User not found')
    }
})

const getAllUsers=asyncHandler(async(req,res)=>
{
    const users=await User.find({})
    res.send(users)
})

const deleteUser=asyncHandler(async(req,res)=>
{
    try{
    const deletedUser=await User.findByIdAndRemove(req.params.id)
   return res.send(deletedUser)
    }
    catch(error){
       return res.status(401).send('User not found')
    }
})


const updateUser=asyncHandler(async(req,res)=>
{
    try{
        const user=await User.findById(req.params.id)
        if(user)
        {
          console.log(req.body)
            user.name=req.body.name||user.name
            user.email=req.body.email||user.email
            if(req.body.isAdmin===true) user.isAdmin=true;
            else if((req.body.isAdmin===false)) user.isAdmin=false;
            const updatedUser=await user.save();
            console.log(updatedUser)
            res.send(updatedUser)
        }
        else{
            res.status(401).send('User not found')
        }
    }
    catch(error){
       return res.status(404).send('Something error')
    }
})
const getUser=asyncHandler(async(req,res)=>
{
    try{
        const user=await User.findById(req.params.id)
        if(user)
        {
           
            res.send(user)
        }
        else{
            res.status(401).send('User not found')
        }
    }
    catch(error){
       return res.status(404).send('Something error')
    }
})

module.exports={register,login,userProfile,updateProfile,getAllUsers,deleteUser,updateUser,
    getUser}