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
    
    useEffect(() => {
      if (sellerInfo) {
        props.history.push('/sellerProfile');
      }
      return () => {
        //
      };
    }, [sellerInfo]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(loginSeller(sellerEmail, sellerPassword));
  
    }
    return <div className="login-form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Login</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>Email or Password is Incorrect.</div>}
          </li>
          <li>
            <label htmlFor="sellerEmail">
              Email
            </label>
            <input type="email" name="sellerEmail" id="sellerEmail" onChange={(e) => setsellerEmail(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="sellerPassword">
                Password
            </label>
            <input type="password" id="sellerPassword" name="sellerPassword" onChange={(e) => setsellerPassword(e.target.value)}>
            </input>
          </li>
          <li>
            <button type="submit" className="button primary">Signin</button>
          </li>
          <li>
            New to Digital Shopping?
          </li>
          <li>
            <Link to="/registerSeller" className="button secondary text-center" >Register as Seller</Link>
          </li>
        </ul>
      </form>
    </div>
  }

  export default LoginSeller;