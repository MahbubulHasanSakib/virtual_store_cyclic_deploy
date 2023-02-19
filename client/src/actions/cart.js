import axios from 'axios'



import {
    ADD_TO_CART_REQUEST_FAILED, ADD_TO_CART_REQUEST_SEND, ADD_TO_CART_REQUEST_SUCCESS,
    ADD_TO_CART,FETCH_CART_ITEMS,FETCH_CART_ITEMS_REQUEST, REMOVE_FROM_CART,
    SET_PAYMENT_METHOD,PLACE_ORDER_REQUEST,PLACE_ORDER_SUCCESS,PLACE_ORDER_FAILED,
ORDER_DETAILS_FAILED,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_REQUEST} from '../types'


/*export const fetchCartItems=()=>(dispatch)=>
{
       
       dispatch({type:FETCH_CART_ITEMS})
    
}*/

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        
        const response = await axios.get(`/api/products/${id}`);
        const fetchedProduct = response.data;

      /*  if (localStorage.getItem('cartItems')) {
            const finditem = (JSON.parse(localStorage.getItem('cartItems'))).find((itm) => itm.product === fetchedProduct._id)
            if (finditem) {
                let qnty = parseInt(qty, 10) + parseInt(finditem.qty, 10)
                console.log(qnty)
                const addItem = {
                    product: fetchedProduct._id,
                    name: fetchedProduct.name,
                    image: fetchedProduct.image,
                    price: fetchedProduct.price,
                    qty: qnty
                }
                dispatch({ type: ADD_TO_CART, payload: addItem })
            }
            else {
                let qnty = parseInt(qty, 10)
                console.log(qnty)
                const addItem = {
                    product: fetchedProduct._id,
                    name: fetchedProduct.name,
                    image: fetchedProduct.image,
                    price: fetchedProduct.price,
                    qty: qnty
                }
                dispatch({ type: ADD_TO_CART, payload: addItem })
            }
        }
        else {*/
            let qnty = parseInt(qty, 10)
            console.log(qnty)
            const addItem = {
                product: fetchedProduct._id,
                name: fetchedProduct.name,
                image: fetchedProduct.image,
                price: fetchedProduct.price,
                qty: qnty
            }
            dispatch({ type: ADD_TO_CART, payload: addItem })
        //}
        localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
    }
    catch (error) {
        dispatch({ type: ADD_TO_CART_REQUEST_FAILED, payload: error.message })
    }
}

export const removeFromCart=(cartItem)=>(dispatch,getState)=>
{
   dispatch({type:REMOVE_FROM_CART,payload:cartItem})
   localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
}

export const PaymentMethod=(payment_method)=>(dispatch,getState)=>
{
   dispatch({type:SET_PAYMENT_METHOD,payload:payment_method})
   localStorage.setItem('paymentMethod', JSON.stringify(getState().paymentMethodReducer))
}

export const placeOrder=(dt)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
   dispatch({type:PLACE_ORDER_REQUEST})
   try{
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.post('/api/order',dt,config)
    dispatch({type:PLACE_ORDER_SUCCESS,payload:data})
   }
   catch(error){
       console.log(error)
    dispatch({type:PLACE_ORDER_FAILED,
        payload:error.response.data
    })
   }
}
export const getOrderDetails=(id)=>async(dispatch,getState)=>
{
    const user=getState().userReducer.userInfo
   dispatch({type:ORDER_DETAILS_REQUEST})
   try{
    const config={
        headers:{
            Authorization:`Bearer ${user.token}`
        }
    }
    const {data}=await axios.get(`/api/order/${id}`,config)
    dispatch({type:ORDER_DETAILS_SUCCESS,payload:data})
   }
   catch(error){
       console.log(error)
    dispatch({type:ORDER_DETAILS_FAILED,
        payload:error.response.data
    })
   }
}