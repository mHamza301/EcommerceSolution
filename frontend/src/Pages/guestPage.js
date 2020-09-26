import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addProduct }from '../action/productAction'

function GuestPage  (props) {
    
        const [Pname, setPname] = useState('');
        const [image, setImage] = useState('');
        const [SP_per_unit, setSP_per_unit] = useState('');
        const [avail_quantity, setAvail_quantity] = useState('');
        const [category, setCategory] = useState('');
        
        
        const productRegister = useSelector(state => state.productRegister);
        const { loading, addItem, error } = productRegister;
        const dispatch = useDispatch();
        const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
        useEffect(() => {
    
            if(addItem){
                props.history.push(redirect);
            }
            
        
          return () => {
            //
          };
        }, [addItem]);
      
        const submitHandler = (e) => {
          e.preventDefault();
          dispatch(addProduct(Pname, image, SP_per_unit, avail_quantity, category));
      
        }
        return <div className="login-form">
          <form onSubmit={submitHandler} >
            <ul className="form-container">
              <li>
                <h2>Add New Product</h2>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
              </li>
              <li>
                <label htmlFor="name">
                  Name
                </label>
                <input type="name" name="Pname" id="Pname" onChange={(e) => setPname(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="image">
                  Image
                </label>
                <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.value)}>
                </input>
              </li><li>
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
                <label htmlFor="name">
                    Category
                </label>
                <input type="name" name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                </input>
              </li>
              <li>
                <button type="submit" className="button primary">Add</button>
              </li>
            </ul>
          </form>
        </div>
      }
    
      

export default GuestPage;