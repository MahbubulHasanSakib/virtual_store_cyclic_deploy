import {ORDER_DELIVER_REQUEST,ORDER_DELIVER_SUCCESS,ORDER_DELIVER_FAILED,
ORDER_DELIVER_RESET} from '../types'
    
    export const orderDeliverReducer = (state = {}, action) => {
        switch (action.type) {
            case ORDER_DELIVER_REQUEST:
                return { loading: true }
            case ORDER_DELIVER_SUCCESS:
                return { loading:false,success:true }
            case ORDER_DELIVER_FAILED:
                return {loading:false,error:action.payload}
            case ORDER_DELIVER_RESET:
                return {}
            default: return state;
        }
    }