import Axios from "axios"
import { ADD_TO_CART, REMOVE_FROM_CART} from "../constants/cartConstant";
import Cookie from 'js-cookie';

const addToCart = (prodID, qty) => async (dispatch, getState) => {

    try {
        const {data} = await Axios.get("/api/products/" + prodID);

       

        dispatch({type: ADD_TO_CART, payload:{
            productID: data._id,
            name: data.name,
            count: data.countInStock,
            price: data.price,
            image: data.image,
            qty,

        }
    });
        const {cart: {cartItem}} = getState();
        Cookie.set("cartItem", JSON.stringify(cartItem));   
      
    } catch (error) {
        
    }

}

const removeFromCart = (prodID) => (dispatch, getState) => {
dispatch({type: REMOVE_FROM_CART, payload: prodID});

const {cart: {cartItem}} = getState();
Cookie.set("cartItem", JSON.stringify(cartItem));
}

export {addToCart, removeFromCart};