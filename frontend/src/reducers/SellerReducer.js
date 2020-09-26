import {SELLER_LOGIN_REQUEST, SELLER_LOGIN_SUCCESS,SELLER_LOGIN_FAIL, SELLER_REGISTER_FAIL, SELLER_REGISTER_REQUEST, SELLER_REGISTER_SUCCESS} from '../constants/sellerConstant'


function SellerloginReducer (state={}, action) {

    switch (action.type) {
        case SELLER_LOGIN_REQUEST:
            return {loading :true}
        case SELLER_LOGIN_SUCCESS:
            return {loading: false, sellerInfo: action.payload}
        case SELLER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;

    }
}

function SellerRegisterReducer (state={}, action) {

    switch (action.type) {
        case SELLER_REGISTER_REQUEST:
            return {loading :true}
        case SELLER_REGISTER_SUCCESS:
            return {loading: false, sellerInfo: action.payload}
        case SELLER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;

    }
}

export {SellerloginReducer, SellerRegisterReducer}