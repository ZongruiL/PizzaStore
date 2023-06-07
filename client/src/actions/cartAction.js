import store from "../store";

export const addToCart = ( pizza,quantity, size)=>(dispatch)=>{
    const varients = ["small","medium","large"];
    if(quantity<0){
        return;
    }
    let cartItem = {
        id : pizza.id,
        name : pizza.name,
        image: pizza.image,
        size: size,
        quantity: quantity,
        prices: pizza.prices,
        price: (pizza.prices+10*varients.indexOf(size))*quantity
    };
    dispatch({type:"ADD_TO_CART",payload:cartItem});
    const cartItems = store.getState().cartReducer.cartItems;
   
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
}

export const deleteFromCart = (pizza) =>(dispatch)=>{
    dispatch({type:"DELETE_FROM_CART",payload:pizza});
    const cartItems = store.getState().cartReducer.cartItems;
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
}