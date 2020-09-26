import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {SQLproduct_Details} from '../action/productAction';


function ViewProductPage(props){
    
    const [qty,setQty] = useState(1);

    const productDetails = useSelector(state=>state.productDetails);    
    const {product, loading, error} = productDetails;

    
   // const productList = useSelector(state=> state.productList);
    //const {product} = productList;

    console.log(product);
    
    const dispatch = useDispatch();
 
    useEffect(() =>{
      dispatch(SQLproduct_Details(props.match.params.PID));
    return () =>{

    };
  }, [])

 // console.log(product[0])
  const handleCart = () =>{
    props.history.push("/updateProduct/" + props.match.params.PID)
  }

  const deleteProduct = () =>{
      props.history.push("/deleteProduct/" + props.match.params.PID);
  }
   
    return <div>
        <div className="back-to-result">
            <Link to="/viewProduct">Back to Home</Link>
        </div>
        {loading? <div>Loading...Please Wait</div>:
        error? <div> {error}</div>:
        (product.map(products =>
          <div className="abcd">
          <div className="details-image">
              <img src={products.image} alt="prod"/> 
          </div>
      
      <div className="details-info">
        <ul>
          <li>
            <h4>{products.Pname}</h4>
          </li>
          <li>
            {product.rating} Stars ({product.reviews} Reviews)
          </li>
          <li>
            Price: <b>PKR{products.SP_per_unit}</b>
          </li>
          <li>
            Description:
            <div>
              {products.category}
            </div>
          </li>
        </ul>
      </div>
      <div className="details-action">
        <ul>
          <li>
            Price: {products.price}
          </li>
          <li>
            Status: {products.avail_quantity>0? "In Stock" : "Out of Stock" }
          </li>
          <li>
            Qty: <select value={qty} onChange={(e) =>{setQty(e.target.value)}}>>
               {[...Array(products.avail_quantity).keys()].map(x=>
                 <option key={x+1} value={x+1}>{x+1} </option>
               )}
            </select>
          </li>
          <li>
             <button onClick={handleCart} className="button">Update Item</button> 
          </li>
          <li>
              <button onClick={deleteProduct} className="button">Delete Product</button>
          </li>
          </ul>
      </div>
</div>
        )
        )
        }
           
    </div>
}

export default ViewProductPage;