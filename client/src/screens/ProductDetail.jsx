import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { addToCart } from '../actions/cartAction';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const pizzastate = useSelector(state=>state.getAllPizzaReducer)
    const {loading, pizzas, error} = pizzastate;
    const pizza = pizzas.find((p) => p.id === parseInt(id));
    const [selectedSize, setSelectedSize] = useState('small');
  const [price, setPrice] = useState(pizza.prices);
  const addToCartHandler = ()=>{
        
    dispatch(addToCart(pizza,1,selectedSize));
}

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    let newPrice;

    switch (newSize) {
      case 'medium':
        newPrice = pizza.prices + 10;
        break;
      case 'large':
        newPrice = pizza.prices + 20;
        break;
      default:
        newPrice = pizza.prices;
    }

    setSelectedSize(newSize);
    setPrice(newPrice);
  };
  
    if (!pizza) {
      return <h2>Product not found</h2>;
    }
  
    return (
        <Container className="mt-5">
        <Row>
          <Col md={6}>
          <Card.Img
                variant="top"
                src={pizza.image}
                alt={pizza.name}
                style={{ width: '70%', height: '80%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            />
          </Col>
          <Col md={6}>
            <Card style={{height:'80%'}}>
              <Card.Body>
                <Card.Title>{pizza.name}</Card.Title>
                <Card.Text>Price: ${price}</Card.Text>
                <Form.Group controlId="sizeSelect" style={{maxWidth:'15%'}}>
                  {/* <Form.Label>Size:</Form.Label> */}
                  <Form.Control as="select" value={selectedSize} onChange={handleSizeChange}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Form.Control>
                </Form.Group>
                <br/>
                <Card.Text>Category: {pizza.category}</Card.Text>
                <Card.Text>Description: {pizza.description}</Card.Text>
                <Button variant="primary" style={{marginTop:'40px'}}onClick={addToCartHandler}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default ProductDetail;