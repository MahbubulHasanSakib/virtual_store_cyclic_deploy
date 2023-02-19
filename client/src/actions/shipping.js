import { SHIPPING_REQUEST_FAILED, SHIPPING_REQUEST_SEND, SHIPPING_REQUEST_SUCCESS } from '../types'

export const shipping = (address, city, postalCode, country) => async (dispatch) => {
    dispatch({ type: SHIPPING_REQUEST_SEND })
    try {
        const data={
            address,
            city,
            postalCode,
            country
        }
        dispatch({type:SHIPPING_REQUEST_SUCCESS,payload:data})
        localStorage.setItem('shippingAddress',JSON.stringify(data));
        
    }
    catch (error) {
         dispatch({type:SHIPPING_REQUEST_FAILED,
            payload:error.response.data})
    }

}