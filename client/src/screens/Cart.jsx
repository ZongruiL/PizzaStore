import React,{useState} from 'react'
import '../style/Cart.css'
import {Row, Container, Col, Button, ButtonGroup} from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import {FaMinusCircle, FaPlusCircle, FaTrash} from 'react-icons/fa'
import { addToCart,deleteFromCart } from '../actions/cartAction'
import { useAuthToken } from "../AuthTokenContext";
import Modal from 'react-bootstrap/Modal';
import Cards from 'react-credit-cards';
import { useNavigate } from 'react-router-dom'
import { placeOrder } from '../actions/orderAction';
import { useAuth0 } from '@auth0/auth0-react'
import Loader from '../components/Loader'

const Cart = () => {
  const { user , isLoading} = useAuth0();
    const cartState = useSelector(state=>state.cartReducer);
    const {cartItems} = cartState;
    const dispatch = useDispatch();
    const totalPrice = cartItems.reduce((a,item)=>a+item.price,0)
    const [show, setShow] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [focused, setFocused] = useState('');
    const  navigate = useNavigate();
    const { accessToken } = useAuthToken();
    
 

    const handlePay = ()=>{
        dispatch(placeOrder(cartItems,user,totalPrice,accessToken))
        //console.log({ cartItems, totalPrice},'handlepay')
        navigate("/order");
        localStorage.removeItem('cartItems')
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    
    

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="credit-card-form">
            <Cards
              number={cardNumber}
              name={cardName}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
            />
            <form>
              <input
                type="tel"
                name="number"
                placeholder="Card Number"
                value={cardNumber}
                required
                onChange={(e) => setCardNumber(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
              />
              <input
                type="text"
                name="name"
                placeholder="Cardholder Name"
                value={cardName}
                required
                onChange={(e) => setCardName(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
              />
              <input
                type="tel"
                name="expiry"
                placeholder="Expiry Date (MM/YY)"
                value={expiry}
                required
                onChange={(e) => setExpiry(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
              />
              <input
                type="tel"
                name="cvc"
                placeholder="CVC"
                value={cvc}
                required
                onChange={(e) => setCvc(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
              />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePay}>
            Confirm Payment
          </Button>
        </Modal.Footer>
      </Modal>

        {
        user ?( (!isLoading)?
        <Container>
          <br/>
            <Row>
                <Col md={6}>
                    <h1>Shopping Cart</h1>
                    <br/>
                    <Row>
                        {cartItems.map(item=>(
                            <>
                                <Col md={7}>
                                    <h5>{item.name}</h5>
                                    <h6>Price: ${item.price}</h6>
                                    <h6>Size: {item.size}</h6>
                                    <h6>
                                      <ButtonGroup>
                                        <Button variant="outline-secondary" onClick={
                                            ()=>{dispatch(addToCart(item,parseInt(item.quantity)-1, item.size))}
                                            }>
                                          -
                                        </Button>
                                        <Button variant="outline-secondary" disabled>
                                          {item.quantity}
                                        </Button>
                                        <Button variant="outline-secondary" onClick={
                                                                          ()=>{const q = parseInt(item.quantity)+1; dispatch(addToCart(item,q, item.size))}
                                                                      } >
                                              +
                                        </Button>
                                    </ButtonGroup>
                                    </h6>
                                    
                                </Col>
                                <Col md={5} style={{marginTop:'30px'}}>
                                    <img alt={item.name} src={item.image} className='imagePos'
                                        style={{width:'80px',height:'px', ...window.innerWidth <= 768 
                                        ? { marginBottom: '10px' } : {}}}/>
                                <FaTrash
                                    style={{cursor: 'pointer',marginLeft:'40%'}}
                                    onClick={
                                        ()=>{dispatch(deleteFromCart(item))}
                                    }
                                    />
  

                                </Col>
                                <hr/>
                            </>
                            
                        ))}
                    </Row>
                </Col>
                <Col md={4} className='paymentInfo' style={{ marginLeft: '50px', ...window.innerWidth <= 768 
                  ? { marginLeft: '0px' } : {} }}>
                    <h1>Payment Information</h1>
                    <h3>Subtotal:</h3><h4>${totalPrice}</h4>
                    <Button variant="primary" onClick={handleShow}>
                        Check out
                    </Button>
                

                </Col>
            </Row>
           
        </Container>: <div><Loader/></div>)
        :
        (<div class="alert alert-danger text-center" role="alert">
        You Must Login First
      </div>)
        
        }
        
    </>
  )
}

export default Cart