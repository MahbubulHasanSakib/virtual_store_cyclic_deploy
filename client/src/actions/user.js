import axios from 'axios'
import Swal from 'sweetalert2'
const { LOGIN_FAILURE, LOGIN_REQUEST_SEND, LOGIN_SUCCESS, LOGOUT ,
REGISTER_FAILURE,REGISTER_SUCCESS,REGISTER_REQUEST_SEND,
USER_DETAILS_FAILED,USER_DETAILS_SUCCESS,USER_DETAILS_REQUEST,USER_DETAILS_UPDATE_FAILED,USER_DETAILS_UPDATE_REQUEST,
USER_DETAILS_UPDATE_SUCCESS,USER_DETAILS_RESET,ORDER_DETAILS_RESET,
USERS_LIST_FAILED,USERS_LIST_SUCCESS,USERS_LIST_REQUEST,USERS_LIST_RESET,DELETE_USER_REQUEST,
DELETE_USER_SUCCESS,DELETE_USER_FAILED,FIND_USER_TO_EDIT_REQUEST,
FIND_USER_TO_EDIT_SUCCESS,FIND_USER_TO_EDIT_FAILED,EDIT_USER_AND_UPDATE_REQUEST,
EDIT_USER_AND_UPDATE_SUCCESS,EDIT_USER_AND_UPDATE_FAILED,EDIT_USER_AND_UPDATE_RESET,
ORDERS_LIST_RESET,CART_ITEMS_RESET} = require('../types')



export const userLogin=(email,password)=>async(dispatch,getState)=>
{
    dispatch({type:LOGIN_REQUEST_SEND})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data}=await axios.post('/api/users/login',{email,password},config)
    console.log(data)
    dispatch({type:LOGIN_SUCCESS,payload:data})
    localStorage.setItem('userInfo',JSON.stringify(data))
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:LOGIN_FAILURE,
        payload:error.response.data
    })
}
}

export const userRegistration=(name,email,password)=>async(dispatch,getState)=>
{
    dispatch({type:REGISTER_REQUEST_SEND})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data}=await axios.post('/api/users/register',{name,email,password},config)
    console.log(data)
    dispatch({type:REGISTER_SUCCESS,payload:data})
    //localStorage.setItem('userInfo',JSON.stringify(data))
    Swal.fire('Congrats','Registration success','success').then(result=>{
        window.location.reload()
    })
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:REGISTER_FAILURE,
        payload:error.response.data
    })
}
}

export const logout=()=>(dispatch)=>
{
    
    dispatch({type:LOGOUT})
    dispatch({type:ORDER_DETAILS_RESET})
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:USERS_LIST_RESET})
    dispatch({type:ORDERS_LIST_RESET})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    dispatch({type:CART_ITEMS_RESET})
    
}

export const deleteUser=(userId)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    try {
        dispatch({type:DELETE_USER_REQUEST})
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }
        const {data}=await axios.get(`/api/users/${userId}/delete`,config)
        console.log(data)
        dispatch({type:DELETE_USER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:DELETE_USER_FAILED,
            payload:error.response.data})
    }
 
 
}


export const getUserDetails=()=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:USER_DETAILS_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get('/api/users/userProfile',config)
    console.log(data)
    dispatch({type:USER_DETAILS_SUCCESS,payload:data})
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:USER_DETAILS_FAILED,
        payload:error.response.data
    })
}
}

export const updateUserDetails=(name,email,password)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:USER_DETAILS_UPDATE_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.post('/api/users/updateProfile',{name:name,email:email,password:password},config)
    console.log(data)
    dispatch({type:USER_DETAILS_UPDATE_SUCCESS,payload:data})
    const updatedUser=getState().userProfileReducer.userDetails;
    const newData={
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        token:user.token
    }
    localStorage.setItem('userInfo',JSON.stringify(newData))
}
catch(error)
{
    console.log(error.response.data)
    dispatch({type:USER_DETAILS_UPDATE_FAILED,
        payload:error.response.data
    })
}
}

export const getUsersList=()=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:USERS_LIST_REQUEST})
    try{
    
    const config={
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get('/api/users',config)
    console.log(data)
    dispatch({type:USERS_LIST_SUCCESS,payload:data})
}
catch(error)
{
    dispatch({type:USERS_LIST_FAILED,
        payload:error.response.data
    })
}
}

export const getUserToEdit=(userId)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:FIND_USER_TO_EDIT_REQUEST})
    try{
    
    const config={
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get(`/api/users/${userId}`,config)
    console.log(data)
    dispatch({type:FIND_USER_TO_EDIT_SUCCESS,payload:data})
}
catch(error)
{
    dispatch({type:FIND_USER_TO_EDIT_FAILED,
        payload:error.response.data
    })
}
}

export const editAndUpdateUser=(userId,name,email,isAdmin)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:EDIT_USER_AND_UPDATE_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.put(`/api/users/${userId}/update`,{name,email,isAdmin},config)
    console.log(data)
    dispatch({type:EDIT_USER_AND_UPDATE_SUCCESS,payload:data})
}
catch(error)
{
    dispatch({type:EDIT_USER_AND_UPDATE_FAILED,
        payload:error.response.data
    })
}
}

export const resetUserUpdate=()=>async(dispatch)=>
{
   dispatch({type:EDIT_USER_AND_UPDATE_RESET})
}