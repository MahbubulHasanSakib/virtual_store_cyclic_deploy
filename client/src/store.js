import {createStore,applyMiddleware, combineReducers} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {productReducer,singleProductReducer,addProductReducer,productDetailsReducer} from './reducers/products'
import {cartReducer} from './reducers/cart'
import {userReducer} from './reducers/user'
import {registerReducer,userProfileReducer,usersListReducer} from './reducers/user'
import {shippingReducer} from './reducers/shipping'
import {paymentMethodReducer} from './reducers/cart'
import {placeOrderReducer,orderDetailsReducer} from './reducers/cart'
import {orderPayReducer,ordersListReducer} from './reducers/orderPay'
import {showMyOrdersReducer} from './reducers/ShowMyOrders'
import {userDetailsReducer} from './reducers/user'
import {orderDeliverReducer} from './reducers/orderDeliver'


const rootReducer=combineReducers({
    productReducer,
    singleProductReducer,
    cartReducer,
    userReducer,
    registerReducer,
    userProfileReducer,
    shippingReducer,
    paymentMethodReducer,
    placeOrderReducer,
    orderDetailsReducer,
    orderPayReducer,
    showMyOrdersReducer,
    usersListReducer,
    userDetailsReducer,
    addProductReducer,
    productDetailsReducer,
    ordersListReducer,
    orderDeliverReducer,
    
})
const getItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const getUserFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const getShippingAddressFromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
const getpaymentMethodFromStorage=localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):{}
const initialState={
   cartReducer:{cartItems:getItemsFromStorage},
   userReducer:{userInfo:getUserFromStorage},
   shippingReducer:{shipping_details:getShippingAddressFromStorage},
   paymentMethodReducer:{paymentMethod:getpaymentMethodFromStorage.paymentMethod}
}

 const store=createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(thunk)))
 export default store