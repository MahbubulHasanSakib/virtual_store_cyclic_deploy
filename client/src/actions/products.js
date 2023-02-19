import axios from 'axios'
import Swal from 'sweetalert2'
import {PRODUCT_REQUEST_SEND,PRODUCT_REQUEST_SUCCESS,PRODUCT_REQUEST_FAILED,
PRODUCT_DETAILS_REQUEST_SEND,PRODUCT_DETAILS_REQUEST_SUCCESS,PRODUCT_DETAILS_REQUEST_FAILED,
DELETE_PRODUCT_FAILED,DELETE_PRODUCT_SUCCESS,DELETE_PRODUCT_REQUEST,
CREATE_PRODUCT_FAILED,CREATE_PRODUCT_SUCCESS,CREATE_PRODUCT_REQUEST,CREATE_PRODUCT_RESET,
FIND_PRODUCT_TO_EDIT_REQUEST,FIND_PRODUCT_TO_EDIT_SUCCESS,FIND_PRODUCT_TO_EDIT_FAILED,
EDIT_PRODUCT_AND_UPDATE_REQUEST,EDIT_PRODUCT_AND_UPDATE_SUCCESS,EDIT_PRODUCT_AND_UPDATE_FAILED
,EDIT_PRODUCT_AND_UPDATE_RESET,ADD_REVIEW_REQUEST,ADD_REVIEW_SUCCESS,ADD_REVIEW_FAILED,
ADD_REVIEW_RESET,SEARCH_PRODUCT} from '../types'


export const fetchProducts=(searchText='')=>async(dispatch)=>
{
    try {
        dispatch({type:PRODUCT_REQUEST_SEND})
        const response=await axios.get(`/api/products?searchText=${searchText}`);
        dispatch({type:PRODUCT_REQUEST_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:PRODUCT_REQUEST_FAILED,payload:error.message})
    }
}
export const fetchProductDetails=(id)=>async(dispatch)=>
{
    try {
      
        dispatch({type:PRODUCT_DETAILS_REQUEST_SEND})
        const response=await axios.get(`/api/products/${id}`);
        dispatch({type:PRODUCT_DETAILS_REQUEST_SUCCESS,payload:response.data})
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_REQUEST_FAILED,payload:error.message})
    }
}

export const deleteProduct=(productId)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }
        const {data}=await axios.get(`/api/products/${productId}/delete`,config)
        console.log(data)
        dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data})
        Swal.fire(
            'Deleted!',
            'The product has been deleted.',
            'success'
          )
    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAILED,
            payload:error.response.data})
            Swal.fire(
                'Failed to Delete',
                 'Something error',
                'error'
              ).then(result=>{
                  window.location.reload()
              })
    }
 
 
}

export const createProducts=(name,price,image,brand,countInStock,category,description)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:CREATE_PRODUCT_REQUEST})
    try{
     const config={
         headers:{
             'Content-Type':'multipart/form-data',
             Authorization:`Bearer ${user.token}`
         }
     }
     const formData=new FormData()
     formData.append("name",name)
     formData.append("price",price)
     formData.append("productImage",image)
     formData.append("brand",brand)
     formData.append("countInStock",countInStock)
     formData.append("category",category)
     formData.append("description",description)
     const {data}=await axios.post('/api/products/addProduct',formData,config)
     dispatch({type:CREATE_PRODUCT_SUCCESS,payload:data})
    }
    catch(error){
        console.log(error)
     dispatch({type:CREATE_PRODUCT_FAILED,
         payload:error.response.data
     })
    }
}
export const resetCreateProduct=()=>(dispatch)=>{
    dispatch({type:CREATE_PRODUCT_RESET})
}
export const getProductToEdit=(productId)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:FIND_PRODUCT_TO_EDIT_REQUEST})
    try{
    
    const config={
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get(`/api/products/${productId}`,config)
    console.log(data)
    dispatch({type:FIND_PRODUCT_TO_EDIT_SUCCESS,payload:data})
}
catch(error)
{
    dispatch({type:FIND_PRODUCT_TO_EDIT_FAILED,
        payload:error.response.data
    })
}
}

export const editAndUpdateProduct=(productId,name,price,image,brand,countInStock,category,description)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:EDIT_PRODUCT_AND_UPDATE_REQUEST})
    try{
    
    const config={
        headers:{
            'Content-Type':'multipart/form-data',
            Authorization:`Bearer ${user.token}`
        }
    }
    const formData=new FormData()
    formData.append("name",name)
    formData.append("price",price)
    formData.append("productImage",image)
    formData.append("brand",brand)
    formData.append("countInStock",countInStock)
    formData.append("category",category)
    formData.append("description",description)

    const {data}=await axios.put(`/api/products/${productId}/update`,formData,config)
    console.log(data)
    dispatch({type:EDIT_PRODUCT_AND_UPDATE_SUCCESS,payload:data})
}
catch(error)
{
    dispatch({type:EDIT_PRODUCT_AND_UPDATE_FAILED,
        payload:error.response.data
    })
}
}

export const resetProductUpdate=()=>async(dispatch)=>
{
   dispatch({type:EDIT_PRODUCT_AND_UPDATE_RESET})
}

export const addReview=(productId,rating,comment)=>async(dispatch,getState)=>
{
    console.log(rating+" "+comment)
    const user=getState().userReducer.userInfo
   try {
  
       dispatch({type:ADD_REVIEW_REQUEST})
       const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
       const {data}=await axios.post(`/api/products/${productId}/reviews`,{rating,comment},config)
       dispatch({type:ADD_REVIEW_SUCCESS,payload:data})
   } catch (error) {
    dispatch({type:ADD_REVIEW_FAILED,
        payload:error.response.data
    })
   }

}

export const searchProduct=(searchText)=>(dispatch)=>{
  dispatch({type:SEARCH_PRODUCT,payload:searchText})
}