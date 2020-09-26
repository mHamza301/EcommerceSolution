import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {productListReducer, productDetailsReducer, productRegisterReducer, productUpdateReducer} from './reducers/ProductReducer';
import {cartReducer} from './reducers/CartReducer';
import { userloginReducer, userRegisterReducer } from './reducers/UserReducer';
import { SellerloginReducer, SellerRegisterReducer } from './reducers/SellerReducer';


const cartItem = Cookie.getJSON("cartItem") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const addItem = Cookie.getJSON("addItem") || null;
const sellerInfo = Cookie.getJSON("sellerInfo") || null;


//console.log(cart_Item);
const initialState={cart : {cartItem}, userLogin: {userInfo}, sellerLogin: {sellerInfo} };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer, 
    cart: cartReducer,
    userLogin: userloginReducer,
    userRegister: userRegisterReducer,
    productRegister: productRegisterReducer,
    sellerLogin: SellerloginReducer,
    sellerRegister: SellerRegisterReducer,
    productUpdate: productUpdateReducer,

});

const composeEnchancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store= createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)));

export default store;
