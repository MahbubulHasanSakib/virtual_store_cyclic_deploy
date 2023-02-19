

import { ADD_TO_CART, PLACE_ORDER_FAILED, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from '../types'
import { REMOVE_FROM_CART, SET_PAYMENT_METHOD ,
ORDER_DETAILS_FAILED,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,CART_ITEMS_RESET} from '../types'
export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const findItem = state.cartItems.find((itm) => itm.product === item.product)
            if (findItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((a) => (a.product === item.product) ?
                        item : a)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_FROM_CART:
            const itemToRemove = action.payload;
            const remaining_items = state.cartItems.filter((itm) => itm.product !== itemToRemove.product)
            return { ...state, cartItems: remaining_items }
        case CART_ITEMS_RESET:
            return { cartItems: [] }
        default: return state;
    }
}
export const paymentMethodReducer = (state = { paymentMethod: '' }, action) => {
    switch (action.type) {
        case SET_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        default: return state;
    }
}

export const placeOrderReducer = (state = { placeOrderDetails: { cartItems: [], shippingAddress: {} } }, action) => {
    switch (action.type) {
        case PLACE_ORDER_REQUEST:
            return { ...state, loading: true,success:false };
        case PLACE_ORDER_SUCCESS:
            return { ...state, placeOrderDetails: action.payload,success:true,loading: false };
        case PLACE_ORDER_FAILED:
            return { ...state, loading: false, error: action.payload,success:false }
        default: return state;
    }
}

export const orderDetailsReducer = (state = {loading:true,orderItems:[],shippingAddress:{}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true,success:false};
        case ORDER_DETAILS_SUCCESS:
            return { ...state, orderDetails: action.payload,success:true,loading: false };
        case ORDER_DETAILS_FAILED:
            return { ...state, loading: false, error: action.payload,success:false}
        default: return state;
    }
}