import Axios from 'axios';
import Cookie from 'js-cookie';
import { SELLER_LOGIN_REQUEST, SELLER_LOGIN_SUCCESS, SELLER_LOGIN_FAIL, SELLER_REGISTER_FAIL, SELLER_REGISTER_REQUEST, SELLER_REGISTER_SUCCESS } from '../constants/sellerConstant';

const loginSeller = (sellerEmail, sellerPassword) => async (dispatch) =>{

    dispatch({type: SELLER_LOGIN_REQUEST, payload:{sellerEmail, sellerPassword}});
    
    try {
        const {data} = await Axios.post("/api/users/loginSeller" , {sellerEmail, sellerPassword})
        
        dispatch({type: SELLER_LOGIN_SUCCESS, payload: data})
        
        Cookie.set("sellerInfo", JSON.stringify(data));
        
    } catch (error) {
        dispatch({type: SELLER_LOGIN_FAIL, payload: error.message})
    }


}


const registerSeller = (sellerName, sellerEmail, sellerPassword, sellerContact, sellerAddress) => async (dispatch) =>{

    dispatch({type: SELLER_REGISTER_REQUEST, payload:{sellerName, sellerEmail, sellerPassword, sellerContact, sellerAddress}});
    
    try {
        const {data} = await Axios.post("/api/users/registerSeller" , {sellerName, sellerEmail, sellerPassword, sellerContact, sellerAddress})
        
        dispatch({type: SELLER_REGISTER_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: SELLER_REGISTER_FAIL, payload: error.message})
    }


}




export {loginSeller, registerSeller};


