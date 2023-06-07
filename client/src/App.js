import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import About from './components/About';
import Container from 'react-bootstrap/Container'
import Home from './screens/Home';
import Cart from './screens/Cart';
import Location from './screens/Location';
import Order from './screens/Order';
import Profile from './screens/Profile';
import ProductDetail from './screens/ProductDetail';
import Verify from './screens/Verify';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";


function App() {
  function RequireAuth({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();
  
    if (!isLoading && !isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  }
  return (
    <>
      
     
      <TopBar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        {/* <Route
              path="/"
              element={
                <RequireAuth>
                  <Cart />
                </RequireAuth>
              }
            >
          <Route path='/cart' element={<Cart/>}/>
        </Route> */}
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/location' element={<Location/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/verify-user' element={<Verify/>}/>
      </Routes>
      
        
      
        
        
      
    </>
  );
}

export default App;
