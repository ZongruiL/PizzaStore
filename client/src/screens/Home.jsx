import React,{useEffect} from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import Pizza from '../components/Pizza'
import { useDispatch,useSelector } from 'react-redux';
import { getAllPizzas } from '../actions/pizzaAction'; 
import Loader from '../components/Loader';
import '../style/Home.css'

const Home = () => {
    const dispatch = useDispatch();
    const pizzastate = useSelector(state=>state.getAllPizzaReducer)
    const {loading, pizzas, error} = pizzastate;
    useEffect(()=>{
        dispatch(getAllPizzas())
    }
    ,[dispatch]);

    
  return (
    <>
        <Container fluid style={{maxWidth:'66.67%'}}>
            {
            loading?(<Loader/>)
            : error ? (<h1>Error</h1>)
            :
            (
                <Row>
                {pizzas.map(pizza=>(
                    
                    <Col md={6} lg={4} className="custom-col">            
                        <Pizza pizza={pizza}/>
                    </Col>
                    
                ))}
                
            </Row>)
        }
            
        </Container>
    
    </>
  )
}

export default Home;
