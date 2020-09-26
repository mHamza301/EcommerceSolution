import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS} from '../constants/productConstant';
import Axios from 'axios';
import axios from 'axios';

const ListProducts =  () => async (dispatch) =>{

     try{
          dispatch({type: PRODUCT_LIST_REQUEST});
          const {data} = await Axios.get("/api/products");
          dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
      }
      catch(error){
          dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    
      }
}

const product_Details = (productID) => async (dispatch) => {
    try {
          dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productID });
          const { data } = await axios.get("/api/products/" + productID);
          dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
        } 
    catch (error) {
          dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
      
        }
}


const addProduct = (Pname, image, SP_per_unit, avail_quantity, category) => async (dispatch) => {
    
    dispatch({ type: PRODUCT_ADD_REQUEST, payload:{Pname, image, SP_per_unit, avail_quantity, category} });

    try {
          const { data } = await axios.post("/api/SQLproduct/addProduct/", {Pname, image, SP_per_unit, avail_quantity, category} );
          dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
        } 
    catch (error) {
          dispatch({ type: PRODUCT_ADD_FAIL, payload: error.message });
          
            }
}

const viewProduct = () => async (dispatch) =>{

      try{
            dispatch({type: PRODUCT_LIST_REQUEST});
            const {data} = await Axios.post("/api/SQLproduct/viewProduct");
            
            dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
        }
        catch(error){
            dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
      
        }
  }

const SQLproduct_Details = (PID) => async (dispatch) => {
    
      try {
          dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: PID });
          const { data } = await axios.post("/api/SQLproduct/viewProduct/" + PID);
          dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
        } 
      catch (error) {
          dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
      
        }
}

          
const SQLproductUpdate = (PID,SP_per_unit, avail_quantity) => async (dispatch) =>{

  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload:{SP_per_unit, avail_quantity}});

  try {
        const { data } = await axios.post("/api/SQLproduct/updateProduct/" +PID, {SP_per_unit, avail_quantity});
        console.log(data);
         await dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
      } 
  catch (error) {
        dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.message });
        
          }

}
export {ListProducts, product_Details, SQLproductUpdate, addProduct, viewProduct, SQLproduct_Details}; 