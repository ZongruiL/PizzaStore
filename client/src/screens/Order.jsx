import React,{useEffect} from 'react'
import { getUserOrders } from '../actions/orderAction'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from "react-bootstrap";
import { useAuthToken } from '../AuthTokenContext';
import { useAuth0 } from '@auth0/auth0-react';
import '../style/Order.css'
const Order = () => {

  const { accessToken } = useAuthToken();
  const { user} = useAuth0();
  console.log(user,'user')
    const orderState = useSelector(state=>state.getUserOrdersReducer);
    const dispatch = useDispatch();
    
      useEffect(()=>{
        if(user){
          dispatch(getUserOrders(accessToken))
        }
       
    },[dispatch,accessToken])
    
    
    
    const {orders} = orderState;

    console.log(orders[0])
    
    

  return (
    <>
        <h1 className='text-center' >Order History</h1>
         {orders.map((order) => (
       <div className="container border p-4 bg-light" style={{marginBottom:'20px', maxWidth:'66.67%'}}>
          <Row>
           <Col md={4} className='item-layout'>
          <h4>Items :</h4>
               {order.items.map((item) => (
                 <h6 key={item.name}>
                   {item.name} ({item.size}) X {item.quantity}
                   
                 </h6>
               ))}
             </Col>
             <Col md={5}>
               <h4>Order Info :</h4>

              <h6>Order id : {order.id}</h6>
              <h6>Total Amount : ${order.totalPrice}</h6>
             </Col>
           </Row>
         </div>
       ))}
     
    </>
  )
}

export default Order