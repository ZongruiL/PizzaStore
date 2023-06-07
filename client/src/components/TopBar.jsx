import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {BrowserRouter, Link, Route, Routes, useNavigate} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import '../style/Navbar.css';


const TopBar = () => {
    const dispatch = useDispatch();
    const cartState = useSelector(state=>state.cartReducer);


    const { user,logout } = useAuth0();
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const signUp = () => loginWithRedirect({ screen_hint: "signup" });
    console.log(user,'user')
    const logoutHandler = ()=>{
      logout();
        // localStorage.removeItem("currentUser")
        localStorage.removeItem("cartItems")
        window.location.href="/";
    }
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container fluid="md">
            <LinkContainer to='/'>
                <Navbar.Brand>
                    <Image
                        src="pizza-icon.png"
                        style={{ height: "50px" }}
                    />
                </Navbar.Brand>
            </LinkContainer>
          <Nav className="ms-auto">
          <Nav.Link href="/" style={{fontFamily:'sans-serif' }}>Home</Nav.Link>
          <Nav.Link href="/cart">Cart {cartState.cartItems.length}</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/location">Location</Nav.Link>
            {user ? 
                (<DropdownButton id="dropdown-basic-button" title={user.name}>
                <Dropdown.Item onClick={logoutHandler}>Log Out</Dropdown.Item>
                <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                <Dropdown.Item href="/order">My Order</Dropdown.Item>
              </DropdownButton>) : 
                (<Button variant="info" style={{borderRadius:'20px'}}onClick={loginWithRedirect}>Login</Button>
                )
                }
          </Nav>
        </Container>
      </Navbar>

     
    </>
  )
}

export default TopBar