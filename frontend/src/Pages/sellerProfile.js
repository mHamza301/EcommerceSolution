import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { loginSeller } from '../action/sellerAction';

function LoginSeller(props) {

    const [sellerEmail, setsellerEmail] = useState('');
    const [sellerPassword, setsellerPassword] = useState('');

    const sellerLogin = useSelector(state => state.sellerLogin);
    const { loading, sellerInfo, error } = sellerLogin;
    
    const dispatch = useDispatch();
    
    //const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    
    const updateHandler = (e) =>{
        e.preventDefault();
        props.history.push('/updateProducts')
    }

    const viewHandler = (e) =>{
        e.preventDefault();
        props.history.push('/viewProduct')
    }
    const addHandler = (e) =>{
        e.preventDefault();
        props.history.push('/addproduct')
    }
    const viewOrderHandler = (e) =>{
        e.preventDefault();
        props.history.push('/orders')
    }
    const updateOrderHandler = (e) =>{
        e.preventDefault();
        props.history.push('/updateOrders')
    }

    useEffect(() => {
      if (!sellerInfo) {
        props.history.push('/loginSeller');
      }
      return () => {
        //
      };
    }, [sellerInfo]);
    
    
    return <div className="main-div">
        <h3 className="name-tag">
            Welcome to your Profile, {sellerInfo}
        </h3>
        <div className="product-button">
        <button className="add-products" onClick={addHandler}> Add Products</button>
        <button className="view-products" onClick={viewHandler}> View Products</button>
        <button className="update-products" onClick={updateHandler}> Update Products</button>    
        <button className="view-order" onClick={viewOrderHandler}> View Orders</button>
        <button className="update-order" onClick={updateOrderHandler}> Update Order Status</button>
        </div>
        
        

      
  </div>
}
  export default LoginSeller;