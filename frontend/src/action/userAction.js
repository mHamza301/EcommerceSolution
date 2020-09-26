import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstant';

const login = (email, password) => async (dispatch) =>{

    
    dispatch({type: USER_LOGIN_REQUEST, payload:{email, password}});
    try {
        const {data} = await Axios.post("/api/users/login" , {email,password})
        console.log (data);

        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        
        Cookie.set("userInfo", JSON.stringify(data));
        //sessionStorage.setItem("email", data.email);
        //sessionStorage.setItem("password", data.password);

    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload: error.message})
    }


}


const register = (fname, password, lname, phoneNumber, address, email) => async (dispatch) =>{

    
    dispatch({type: USER_REGISTER_REQUEST, payload:{fname, password, lname, phoneNumber, address, email}});
    try {
        const {data} = await Axios.post("/api/users/register" , {fname, password, lname, phoneNumber, address, email})
        //console.log (data);

        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        //Cookie.set("userInfo", JSON.stringify(data));
        //sessionStorage.setItem("email", data.email);
        //sessionStorage.setItem("password", data.password);

    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.message})
    }


}




export {login, register};


