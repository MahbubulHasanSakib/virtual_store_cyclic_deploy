import {
    PRODUCT_REQUEST_SEND, PRODUCT_REQUEST_SUCCESS, PRODUCT_REQUEST_FAILED,
    PRODUCT_DETAILS_REQUEST_SEND, PRODUCT_DETAILS_REQUEST_SUCCESS, PRODUCT_DETAILS_REQUEST_FAILED,
    DELETE_PRODUCT_FAILED, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_REQUEST,
    CREATE_PRODUCT_FAILED, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_RESET, FIND_PRODUCT_TO_EDIT_REQUEST, FIND_PRODUCT_TO_EDIT_SUCCESS,
    FIND_PRODUCT_TO_EDIT_FAILED, EDIT_PRODUCT_AND_UPDATE_REQUEST, EDIT_PRODUCT_AND_UPDATE_SUCCESS,
    EDIT_PRODUCT_AND_UPDATE_FAILED, EDIT_PRODUCT_AND_UPDATE_RESET, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAILED, ADD_REVIEW_RESET,SEARCH_PRODUCT
} from '../types'


export const productReducer = (state = { products: [],tempProducts:[],loading:false,error:null }, action) => {
    switch (action.type) {

        case PRODUCT_REQUEST_SEND:
            return { ...state, loading: true }
        case PRODUCT_REQUEST_SUCCESS:
            return { ...state, products: action.payload,tempProducts:action.payload,loading: false }
        case PRODUCT_REQUEST_FAILED:
            return { ...state, error: action.payload, loading: false }
        case SEARCH_PRODUCT:
            const searchText = action.payload
            let matchedProducts =state.tempProducts.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()))
            return { ...state, loading: false, products: matchedProducts }
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case DELETE_PRODUCT_SUCCESS:
            const productToRemove = action.payload;
            const remaining_products = state.products.filter((product) => product._id !== productToRemove._id)
            return { ...state, products: remaining_products, loading: false }
        case DELETE_PRODUCT_FAILED:
            return { ...state, loading: false, error: action.payload }
        default: return state
    }
}
export const singleProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case PRODUCT_DETAILS_REQUEST_SEND:
            return { ...state, loading: true }
        case PRODUCT_DETAILS_REQUEST_SUCCESS:
            return { ...state, product: action.payload, loading: false }
        case PRODUCT_DETAILS_REQUEST_FAILED:
            return { ...state, error: action.payload, loading: false }
        case ADD_REVIEW_REQUEST:
            return { ...state, loading: true }
        case ADD_REVIEW_SUCCESS:
            return { ...state, product: action.payload, loading: false, success: true }
        case ADD_REVIEW_FAILED:
            return { ...state, error: action.payload, loading: false, success: false }
        default: return state
    }
}

export const addProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case CREATE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, product: action.payload, loading: false, success: true }
        case CREATE_PRODUCT_FAILED:
            return { ...state, error: action.payload, loading: false, success: false }
        case CREATE_PRODUCT_RESET:
            return { product: {} }
        default: return state
    }
}

/*export const addReviewReducer=(state={product:{}},action)=>
{
    switch (action.type) {
        case ADD_REVIEW_REQUEST:
            return {...state,loading:true}
        case ADD_REVIEW_SUCCESS:
            return {...state,product:action.payload,loading:false,success:true}
        case ADD_REVIEW_FAILED:
            return {...state,error:action.payload,loading:false,success:false}
        default: return state
    }
}*/

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case FIND_PRODUCT_TO_EDIT_REQUEST:
            return { ...state, loading: true }
        case FIND_PRODUCT_TO_EDIT_SUCCESS:
            return { ...state, product: action.payload, loading: false }
        case FIND_PRODUCT_TO_EDIT_FAILED:
            return { ...state, loading: false, error: action.payload }
        case EDIT_PRODUCT_AND_UPDATE_REQUEST:
            return { ...state, loading: true }
        case EDIT_PRODUCT_AND_UPDATE_SUCCESS:
            return { ...state, product: action.payload, success: true, loading: false }
        case EDIT_PRODUCT_AND_UPDATE_FAILED:
            return { ...state, loading: false, error: action.payload, success: false }
        case EDIT_PRODUCT_AND_UPDATE_RESET:
            return { product: {} }
        default: return state;
    }
}