import React from 'react';
//import logo from './logo.svg';
//import data from "./data";
import './App.css';
import ProductPage from "./Pages/ProductPage";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import {BrowserRouter, Route, Link} from "react-router-dom";
import loginpage1 from './Pages/loginpage1';
import { useSelector } from 'react-redux';
import RegisterPage from './Pages/RegisterPage';
import productAddPage from './Pages/productAddPage';
import guestPage from './Pages/guestPage';
import loginSeller from './Pages/loginSeller';
import  registerSeller  from './Pages/registerSeller';
import sellerProfile from './Pages/sellerProfile';
import viewProduct from './Pages/viewProduct';
import viewProductPage from './Pages/viewProductPage';
import UpdateProductInfor from './Pages/updateProductInfor';



function App() {


    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const sellerLogin = useSelector(state => state.sellerLogin);
    const {sellerInfo} = sellerLogin;

    const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open");
}
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
         <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Digital Shopping System </Link>
                
            </div>
            <div className="header-links">
                <a href="cart.html"> Cart </a>
                {
                    userInfo ? <Link to="/profile" >{userInfo}</Link> :
                    <Link to ="/login" >Login</Link>
                }

                                   
                        
            </div>
         </header>
         <aside className="sidebar">
             <h3>Categories</h3>
             <button className="sidebar-closebutton" onClick={closeMenu}>
                x
             </button>
             <ul>
                 <li> 
                     <a href="tomatoes.html">Fresh Tomatoes</a> 
                 </li>
                 <li>
                     <a href="onion.html">Fresh Onion</a>
                 </li>
                 <li>
                     {
                         sellerInfo ? <Link to ="/logout">Logout</Link>: 
                         <Link to ="/loginSeller">Login as Seller</Link>
                     }
                    
                 </li>
                 <li>
                     {
                         sellerInfo ? <Link to ="/sellerProfile">Profile</Link>:
                         <Link to ="/registerSeller">Register as Seller</Link>
                     }
                    
                 </li>
             </ul>
         </aside>
          
        <main className="main">
            <div className="content">
            <Route path="/profile" />
            <Route path="/deleteProduct/:PID" ></Route>
            <Route path="/updateProduct/:PID" component={UpdateProductInfor}/>
            <Route path="/SQLproduct/:PID" component={viewProductPage}/>
            <Route path="/viewProduct" component={viewProduct}/>
            <Route path="/sellerProfile"  component={sellerProfile} />
            <Route path="/registerSeller" component={registerSeller}/> 
            <Route path ="/loginSeller" component={loginSeller}/>
            <Route path ="/guestCheckout" component={guestPage}/>
            <Route path="/addproduct" component={productAddPage}/>
            <Route path ="/login" component={loginpage1} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/cart/:id?" component={CartPage} /> 
              
             </div>
            
        </main>
        <footer className="footer">
            &copy; Made with love for Database Engineering Project
        </footer>
  </div>
  </BrowserRouter>

  );
}

export default App;
