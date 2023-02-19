import { ORDER_PAY_FAILED, ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_RESET,
ORDERS_LIST_REQUEST,ORDERS_LIST_SUCCESS,ORDERS_LIST_FAILED,ORDERS_LIST_RESET } from '../types'
import axios from 'axios'

export const payForOrder=(orderId,token,amount)=>async(dispatch,getState)=>
{
   const user=getState().userReducer.userInfo
   dispatch({type:ORDER_PAY_REQUEST})
   try{
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.put(`/api/order/${orderId}/pay`,{token,amount,user,orderId},config)
    dispatch({type:ORDER_PAY_SUCCESS,payload:data})
   }
   catch(error){
       console.log(error)
    dispatch({type:ORDER_PAY_FAILED,
        payload:error.response.data
    })
   }
}

export const getOrdersList=()=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
    dispatch({type:ORDERS_LIST_REQUEST})
    try{
    
    const config={
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get('/api/order/getOrders',config)
    console.log(data)
    dispatch({type:ORDERS_LIST_SUCCESS,payload:data})
}
catch(error)
{
    dispatch({type:ORDERS_LIST_FAILED,
        payload:error.response.data
    })
}
}