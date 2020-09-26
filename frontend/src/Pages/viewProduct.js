import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {viewProduct} from '../action/productAction';

function ProductDisplayPage(props){
    
    const productList = useSelector(state=> state.productList);
    const {product, loading, error} = productList;

    const sellerLogin = useSelector(state=>state.sellerLogin);
    const {sellerInfo} = sellerLogin;
    
    const dispatch = useDispatch();

    useEffect(() =>{
        if(!sellerInfo){
            props.history.push('/loginSeller')
        }
        dispatch(viewProduct());
      return () =>{

      };
    }, [sellerInfo])

    return loading ? <div>Loading....Please Wait</div>:
    error ? <div>{error}</div>:
    
    <ul className="product">
    {
      product.map(products =>
        
    
      <li>
          <div className="product-item">
          <Link to={'/viewProduct/' + products.PID}>
            <img className="product-image" src={products.image} />
            </Link>
          <div className="product-name">
          <Link to={'/SQLproduct/' + products.PID}>Name: {products.Pname}</Link>    
          </div>
      <div className="product-seller">Price: {products.SP_per_unit} </div>       
      <div className="product-price">Quantity Available: {products.avail_quantity}</div>
        
          </div>
      </li>
      )
    }
  </ul>
}

export default ProductDisplayPage;