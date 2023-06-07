import axios from "axios";
import store from "../store";


export const placeOrder = (cartItems, currentUser, totalPrice,accessToken)=> async (dispatch)=>{
    //console.log({cartItems,currentUser,totalPrice})
    dispatch({type:'PLACE_ORDER_REQUEST'})
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/placeorder`,{currentUser,cartItems,totalPrice},
        {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        dispatch({type:'PLACE_ORDER_SUCCESS',payload: res.data})     
        
    }catch(error){
        dispatch({type:'PLACE_ORDER_FAIL'})
        //console.log(error)
    }
}

export const getUserOrders = (accessToken)=>async(dispatch)=>{
   
    dispatch({type:'USER_ORDER_REQUEST'})
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/getuserorder`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        });
        dispatch({ type: "USER_ORDER_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "USER_ORDER_FAIL", payload: error });
      }
}