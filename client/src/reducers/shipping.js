import { SHIPPING_REQUEST_FAILED, SHIPPING_REQUEST_SEND, SHIPPING_REQUEST_SUCCESS } from '../types'

export const shippingReducer = (state = {shipping_details:{}}, action) => {
    switch (action.type) {
        case SHIPPING_REQUEST_SEND:
            return { ...state, loading: true }
        case SHIPPING_REQUEST_SUCCESS:
            return { ...state, loading: false, shipping_details: action.payload }
        case SHIPPING_REQUEST_FAILED:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
