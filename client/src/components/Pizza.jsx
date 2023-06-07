import React,{useState} from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';
import '../style/Pizza.css'
const Pizza = ({pizza}) => {
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const sizes = ['small', "medium", "large"]
    const [size, setSize] = useState('small');
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const addToCartHandler = ()=>{
        
        dispatch(addToCart(pizza,quantity,size))
    }

  return (
    <>
        <Card style={{ width: '18rem', marginTop:'30px' }}>
        <Link to={`/product/${pizza.id}`} key={pizza.id}>
            <Card.Img variant="top" src={pizza.image} style={{height:'200px'}}/>
        </Link>
      <Card.Body>
        {/* <Link to={`/product/${pizza.id}`} key={pizza.id}>
       
        </Link> */}
        <Card.Title>{pizza.name}</Card.Title>
        <hr/>
        <Card.Text>
          <Row>
            <Col md={6}>
                <h6>Size</h6>
                <select value={size} onChange={e=>{setSize(e.target.value)}}>
                    {sizes.map(s=>(
                        <option value={s} >
                            {s}
                        </option>
                    ))}
                </select>
            </Col>
            
            <Col md={6}>
                <h6>Quantity</h6>
                <select value={quantity} onChange={e=>{setQuantity(e.target.value)}}>
                    {arr.map((a)=>(
                        <option value={a} >
                            {a}
                        </option>
                    ))}
                </select>
            </Col>
          </Row>
        </Card.Text>
        <Row>
            <Col md={6}>Price: ${(pizza.prices+10*sizes.indexOf(size))*quantity}</Col>
            <Col md={6}>
                <Button 
                onClick={addToCartHandler}
                style={{background: '#eb0029',borderRadius: '20px',
                display: "inline-block",
                color: '#fffffF',
                fontWeight: '700',
                textDecoration:'none'
                }}>Add to cart</Button>
            </Col>
        </Row>
      </Card.Body>
    </Card>
    </>
  )
}

export default Pizza