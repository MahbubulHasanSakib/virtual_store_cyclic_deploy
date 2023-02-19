import {ORDER_DETAILS_RESET, SHOW_MY_ORDERS_FAILED,SHOW_MY_ORDERS_REQUEST,SHOW_MY_ORDERS_SUCCESS} from '../types'

export const showMyOrdersReducer = (state = {orderItems:[]}, action) => {
    switch (action.type) {
        case SHOW_MY_ORDERS_REQUEST:
            return { ...state, loading: true }
        case SHOW_MY_ORDERS_SUCCESS:
            return { ...state, loading: false,myOrders: action.payload }
        case SHOW_MY_ORDERS_FAILED:
            return { ...state, loading: false, error: action.payload }
        case ORDER_DETAILS_RESET:
            return {orderItems:[]}
        default: return state;
    }
}