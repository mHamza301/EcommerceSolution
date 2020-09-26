import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {ListProducts} from '../action/productAction';

function HomePage(props){
    
    const productList = useSelector(state=> state.productList);
    const {product, loading, error} = productList;
    
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(ListProducts());
      return () =>{

      };
    }, [])

    return loading ? <div>Loading....Please Wait</div>:
    error ? <div>{error}</div>:
    
    <ul className="product">
    {
      product.map(products =>
        
    
      <li>
          <div className="product-item">
          <Link to={'/products/' + products._id}>
            <img className="product-image" src={products.image} alt="product-item"/>
            </Link>
          <div className="product-name">
          <Link to={'/products/' + products._id}>{products.name}</Link>    
          </div>
      <div className="product-seller">{products.seller}</div>      
      <div className="product-price">{products.price}</div>
          <div className="product-rating">{products.rating} stars ({products.reviews}) </div> 
          </div>
      </li>)
    }
  </ul>
}

export default HomePage;