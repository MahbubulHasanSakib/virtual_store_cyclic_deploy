const { LOGIN_FAILURE, LOGIN_REQUEST_SEND, LOGIN_SUCCESS, LOGOUT,
    REGISTER_FAILURE, REGISTER_REQUEST_SEND, REGISTER_SUCCESS, USER_DETAILS_FAILED, USER_DETAILS_SUCCESS
    , USER_DETAILS_REQUEST, USER_DETAILS_UPDATE_FAILED, USER_DETAILS_UPDATE_REQUEST,
    USER_DETAILS_UPDATE_SUCCESS, USER_DETAILS_RESET, ORDER_DETAILS_FAILED,
    USERS_LIST_REQUEST, USERS_LIST_SUCCESS, USERS_LIST_FAILED, USERS_LIST_RESET,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_FAILED, FIND_USER_TO_EDIT_FAILED, FIND_USER_TO_EDIT_REQUEST,
    FIND_USER_TO_EDIT_SUCCESS, EDIT_USER_AND_UPDATE_REQUEST, EDIT_USER_AND_UPDATE_SUCCESS,
    EDIT_USER_AND_UPDATE_FAILED,EDIT_USER_AND_UPDATE_RESET } = require('../types')

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST_SEND:
            return { ...state, loading: true }
        case LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload }
        case LOGIN_FAILURE:
            return { ...state, loading: false, message: action.payload }
        case LOGOUT:
            return {}

        default: return state;
    }
}
export const registerReducer = (state = {}, action) => {
    switch (action.type) {

        case REGISTER_REQUEST_SEND:
            return { ...state, loading: true }
        case REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, message: 'Registration Successfull' }
        case REGISTER_FAILURE:
            return { ...state, loading: false, message: action.payload }
        default: return state;
    }
}
export const userProfileReducer = (state = { userDetails: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { ...state, loading: false, userDetails: action.payload }
        case USER_DETAILS_FAILED:
            return { ...state, loading: false, error: action.payload }
        case USER_DETAILS_UPDATE_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_UPDATE_SUCCESS:
            return { ...state, loading: false, userDetails: action.payload, message: 'Profile Information Updated' }
        case USER_DETAILS_UPDATE_FAILED:
            return { ...state, loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { userDetails: {} }
        default: return state;
    }
}

export const usersListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return { ...state, loading: true }
        case USERS_LIST_SUCCESS:
            return { ...state, users: action.payload, loading: false }
        case USERS_LIST_FAILED:
            return { ...state, loading: false, error: action.payload }
        case DELETE_USER_REQUEST:
            return { ...state, loading: true }
        case DELETE_USER_SUCCESS:
            const userToRemove = action.payload;
            const remaining_users = state.users.filter((user) => user._id !== userToRemove._id)
            return { ...state, users: remaining_users, loading: false }
        case DELETE_USER_FAILED:
            return { ...state, loading: false, error: action.payload }
        case USERS_LIST_RESET:
            return { users: [] }
        default: return state;
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case FIND_USER_TO_EDIT_REQUEST:
            return { ...state, loading: true }
        case FIND_USER_TO_EDIT_SUCCESS:
            return { ...state, user: action.payload, loading: false }
        case FIND_USER_TO_EDIT_FAILED:
            return { ...state, loading: false, error: action.payload }
        case EDIT_USER_AND_UPDATE_REQUEST:
            return { ...state, loading: true }
        case EDIT_USER_AND_UPDATE_SUCCESS:
            return { ...state, user: action.payload,success:true,loading: false }
        case EDIT_USER_AND_UPDATE_FAILED:
            return { ...state, loading: false,success:false,error: action.payload }
        case EDIT_USER_AND_UPDATE_RESET:
            return { user: {}}
        default: return state;
    }
}


/*module.exports = {
    userReducer, registerReducer, userProfileReducer, usersListReducer,
    userDetailsReducer
}*/