
import React, { useEffect, useState } from 'react';
//import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { SQLproductUpdate } from '../action/productAction';

function UpdateProductInfor(props) {

    
    const [SP_per_unit, setSP_per_unit] = useState('');
    const [avail_quantity, setAvail_quantity] = useState('');
    
    const productRegister = useSelector(state => state.productRegister);
    const { loading, error } = productRegister;

    const sellerLogin = useSelector(state =>state.sellerLogin);
    const {sellerInfo} = sellerLogin;
    
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {

        if(!sellerInfo){
            props.history.push('/sellerLogin');
        }
        
    
      return () => {
        //
      };
    }, [sellerInfo]);
  
    let PID=props.match.params.PID

    const submitHandler = async (e) => {
      e.preventDefault();
      dispatch(SQLproductUpdate(PID,SP_per_unit, avail_quantity));
       await props.history.push('/SQLproduct/' + PID)
  
    }
    return <div className="login-form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Update Product </h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">
              Selling Price
            </label>
            <input type="name" name="SP_per_unit" id="SP_per_unit" onChange={(e) => setSP_per_unit(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="name">
                Quantity
            </label>
            <input type="name" name="avail_quantity" id="avail_quantity" onChange={(e) => setAvail_quantity(e.target.value)}>
            </input>
          </li>
          <li>
            <button type="submit" onClick={submitHandler} className="button primary">Update</button>
          </li>
        </ul>
      </form>
    </div>
  }

  export default UpdateProductInfor;