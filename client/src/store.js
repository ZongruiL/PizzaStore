
import {configureStore} from '@reduxjs/toolkit'
import { cartReducer } from './reducers/cartReducer'
import { combineReducers } from 'redux';
import { placeOrderReducer } from './reducers/orderReducer';
import { getAllPizzaReducer } from './reducers/pizzaReducer'
import { getUserOrdersReducer } from './reducers/orderReducer';

const rootReducer = combineReducers({
    cartReducer: cartReducer,
    getAllPizzaReducer: getAllPizzaReducer,
    
    placeOrderReducer:placeOrderReducer,
    getUserOrdersReducer:getUserOrdersReducer,
   

  });   



const cartItems = localStorage.getItem('cartItems') 
                ? JSON.parse(localStorage.getItem('cartItems')) : [];


const initialState = {
    cartReducer:{
        cartItems: cartItems,
    },
  
    

}


const store = configureStore(
    {
    reducer:rootReducer,
    preloadedState:initialState}
    )



// const store = configureStore({
//     reducer:{
//         getAllPizzaReducer:getAllPizzaReducer,
//         cartReducer:cartReducer,
//     }
// }, initialState)
export default store;

