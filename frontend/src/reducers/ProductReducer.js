import {PRODUCT_ADD_SUCCESS,PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL} from '../constants/productConstant';


function productListReducer(state={product: []}, action){

    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return{loading: false, product: action.payload};
        case PRODUCT_LIST_FAIL:
            return{loading: false, error: action.payload};
        default:
            return state;        
            }
}

function productDetailsReducer(state={product: []}, action){

    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
           return{loading: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return{loading: false, error: action.payload};
        default:
            return state;        
                }
        }

function productRegisterReducer(state={}, action){

    switch (action.type){
        case PRODUCT_ADD_REQUEST:
            return {loading: true};
        case PRODUCT_ADD_SUCCESS:
            return{loading: false, addItem: action.payload};
        case PRODUCT_ADD_FAIL:
            return{loading: false, error: action.payload};
        default:
            return state;        
    }
}        

function productUpdateReducer(state={}, action){

    switch (action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true};
        case PRODUCT_UPDATE_SUCCESS:
            return{loading: false, addItem: action.payload};
        case PRODUCT_UPDATE_FAIL:
            return{loading: false, error: action.payload};
        default:
            return state;        
    
}
}
export { productListReducer, productDetailsReducer, productRegisterReducer, productUpdateReducer };