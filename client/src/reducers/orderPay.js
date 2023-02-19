import { ORDER_PAY_FAILED, ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_RESET,
ORDERS_LIST_REQUEST,ORDERS_LIST_SUCCESS,ORDERS_LIST_FAILED,ORDERS_LIST_RESET } from '../types'

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }
        case ORDER_PAY_SUCCESS:
            return { loading:false,success:true }
        case ORDER_PAY_FAILED:
            return {loading:false,error:action.payload}
        case ORDER_PAY_RESET:
            return {}
        default: return state;
    }
}

export const ordersListReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case ORDERS_LIST_REQUEST:
            return { loading: true }
        case ORDERS_LIST_SUCCESS:
            return { loading:false,success:true,orders:action.payload }
        case ORDERS_LIST_FAILED:
            return {loading:false,error:action.payload,success:false}
        case ORDERS_LIST_RESET:
            return {orders:[]}
        default: return state;
    }
}