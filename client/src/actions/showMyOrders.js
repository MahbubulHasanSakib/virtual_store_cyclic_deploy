import {SHOW_MY_ORDERS_FAILED,SHOW_MY_ORDERS_REQUEST,SHOW_MY_ORDERS_SUCCESS} from '../types'
import axios from 'axios'

export const showMyOrders = () => async (dispatch,getState) => {
    try {
        dispatch({ type: SHOW_MY_ORDERS_REQUEST })
        const user=getState().userReducer.userInfo
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }
        const {data}=await axios.get('/api/order',config)
        dispatch({ type:SHOW_MY_ORDERS_SUCCESS,payload:data})
    }
    catch (error) {
         dispatch({type:SHOW_MY_ORDERS_FAILED,
            payload:error.response.data})
    }

}