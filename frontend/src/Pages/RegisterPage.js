
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../action/userAction';

function RegisterPage(props) {

    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
      return () => {
        //
      };
    }, [userInfo]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(register(fname, password, lname, phoneNumber, address, email));
  
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
              First Name
            </label>
            <input type="name" name="fname" id="fname" onChange={(e) => setFName(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="name">
              Last Name
            </label>
            <input type="name" name="lname" id="lname" onChange={(e) => setLName(e.target.value)}>
            </input>
          </li><li>
            <label htmlFor="email">
              Email
            </label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="phoneNumber">
                Mobile Number
            </label>
            <input type="phoneNumber" name="phoneNumber" id="phoneNumber" onChange={(e) => setNumber(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="address">
              Address
            </label>
            <input type="address" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
            </input>
          </li>
          <li>
            <button type="submit" className="button primary">Register</button>
          </li>
          <li>
            Already have an account? <Link to="/login">Login</Link>
          </li>
        </ul>
      </form>
    </div>
  }

  export default RegisterPage