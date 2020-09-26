import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { registerSeller} from '../action/sellerAction';

function RegisterSeller(props) {

    const [sellerName, setsellerName] = useState('');
    const [sellerEmail, setsellerEmail] = useState('');
    const [sellerAddress, setsellerAddress] = useState('');
    const [sellerContact, setsellerContact] = useState('');
    const [sellerPassword, setsellerPassword] = useState('');
    
    
    const sellerRegister = useSelector(state => state.sellerRegister);
    const { loading, sellerInfo, error } = sellerRegister;

    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    
    useEffect(() => {
      if (sellerInfo) {
        props.history.push(redirect);
      }
      return () => {
        //
      };
    }, [sellerInfo]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(registerSeller(sellerName, sellerEmail, sellerPassword, sellerContact, sellerAddress));
  
    }
    return <div className="login-form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Register</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>Email Already Present</div>}
          </li>
          <li>
            <label htmlFor="name">
              Name
            </label>
            <input type="name" name="sellerName" id="sellerName" onChange={(e) => setsellerName(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="email">
              Email
            </label>
            <input type="email" name="sellerEmail" id="sellerEmail" onChange={(e) => setsellerEmail(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="password">
                Password
            </label>
            <input type="password" name="sellerPassword" id="sellerPassword" onChange={(e) => setsellerPassword(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="address">
              Address
            </label>
            <input type="address" name="sellerAddress" id="sellerAddress" onChange={(e) => setsellerAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="number">
                Contact
            </label>
            <input type="number" id="sellerContact" name="sellerContact" onChange={(e) => setsellerContact(e.target.value)}>
            </input>
          </li>
          <li>
            <button type="submit" className="button primary">Register</button>
          </li>
          <li>
            Already have an account? <Link to="/loginSeller">Login</Link>
          </li>
        </ul>
      </form>
    </div>
  }

  export default RegisterSeller