import axios from 'axios'
import Swal from 'sweetalert2'
import {ORDER_DELIVER_REQUEST,ORDER_DELIVER_SUCCESS,ORDER_DELIVER_FAILED,
    ORDER_DELIVER_RESET} from '../types'


    
    export const deliverForOrder=(orderId)=>async(dispatch,getState)=>
    {
       const user=getState().userReducer.userInfo
       dispatch({type:ORDER_DELIVER_REQUEST})
       try{
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`
            }
        }
        const {data}=await axios.put(`/api/order/${orderId}/deliver`,{orderId},config)
        dispatch({type:ORDER_DELIVER_SUCCESS,payload:data})
        Swal.fire(
            'Delivered!',
            'The product has been delivered',
            'success'
          )
       }
       catch(error){
           console.log(error)
        dispatch({type:ORDER_DELIVER_FAILED,
            payload:error.response.data
        })
        Swal.fire(
            'Not delivered',
            'Something wrong',
            'error'
          )
       }
    }