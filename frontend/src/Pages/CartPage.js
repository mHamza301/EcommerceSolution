import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../action/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

function CartPage(props){

    const cart = useSelector(state => state.cart)
    const {cartItem} = cart;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const prodID= props.match.params.id; 
    const Qty = props.location.search? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();
    
    const removeFromCartHandler =(prodID) =>{
        dispatch(removeFromCart(prodID))
    } 

    useEffect(() =>{
        if(prodID){
            dispatch(addToCart(prodID, Qty));
        }
    }, [])

    const CheckoutHandler = () =>{
        props.history.push("/login?redirect=shipping");
    }
    const GuestCheckoutHandler = () =>{
        props.history.push("/guestCheckout?redirect=shipping");
    } 
    
    return  <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
                    </h3>
                    <div>
                        Price
                    </div>
                </li>
            
                {
                    
                    cartItem.length === 0 ?
                    <div>
                        Your Cart is Empty.
                    </div>
                    :
                    cartItem.map((item)  =>
                        <li>
                        <div className="cart-image">
                            <img src={item.image} alt="product"/>
                        </div>
                        <div className="cart-name">
                            <div>
                                <Link to={"/products/" + item.productID}>
                                    {item.name}
                                </Link>

                            </div>
                        <div>
                                Qty:
                        <select value={item.qty} onChange={(e) => dispatch(addToCart(prodID, e.target.value))}>
                      {[...Array(item.count).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1} </option>
                      )}   
                        </select>
                                <button type="button" className="Dlt-Button" onClick={() =>removeFromCartHandler(item.prodID)}>
                                    Delete
                                </button>

                            </div>
                        </div>
                        <div className="cart-price">
                           $ {item.price}
                        </div>
                        </li>
                        )
                
                    }
            </ul>
        </div>

        <div className="cart-action">
                    <h3>
                Subtotal({cartItem.reduce((a,c) => a+ c.qty, 0)}items)
                :
                $ {cartItem.reduce((a,c) => a+ c.price* c.qty, 0)}
                    </h3>
                    
                    <button onClick={CheckoutHandler} className="button primary full-width" disabled={cartItem.length===0}>
                        Proceed to Checkout
                    </button>

                    <button onClick={GuestCheckoutHandler}  className="button primary full-width" disabled= {cartItem.length===0 || userInfo }>
                        Guest Checkout
                    </button>
                
        </div>
    </div>
}

export default CartPage;