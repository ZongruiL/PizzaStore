import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import '../style/Profile.css'
import { useAuthToken } from '../AuthTokenContext';
const Profile = () => {

  const { user} = useAuth0();
  const { accessToken } = useAuthToken();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [shownPhoneNumber, setShownPhoneNumber] = useState("");
    
  
    const handleAddPhoneNumber = () => {
         handleShow();
    };

    
    
    async function changePhoneNumber(phoneNumber) {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/changePhoneNumber`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      });
      if (data.ok) {
        const newNumber = await data.json();
        return newNumber;
      } else {
        return null;
      }
    }


    const handleSaveChangesClick = async (e) => {
      e.preventDefault();
      if(!phoneNumber)  { 
        return;
      }
      const newPhoneNumber = await changePhoneNumber(phoneNumber)
      console.log(newPhoneNumber,'newPhoneNumber')
      if(newPhoneNumber){
        setShownPhoneNumber(newPhoneNumber.phoneNumber)
      }
      
      handleClose();
    };

  return (
    
    <div className="centered-container">
        {user && 
        
        
        <Container className='cont' style={{maxWidth:'66.67%'}}>
        <Row>
          <Col>
            <h2 className="text-center mt-4 mb-4" >My Profile</h2>
            <Card className="shadow mb-3">
              <Card.Body>
                <Card.Title>User Name</Card.Title>
                <Card.Text>{user.name}</Card.Text>
                <img src={user.picture} width="70" alt="profile avatar" />
              </Card.Body>
            </Card>
            <Card className="shadow mb-3">
              <Card.Body>
                <Card.Title>Email</Card.Title>
                <Card.Text>{user.email}</Card.Text>
      
              </Card.Body>
            </Card>
            <Card className='shadow'>
              <Card.Body>
                <Card.Title>Phone Number</Card.Title>
                <Card.Text>{shownPhoneNumber}</Card.Text>
      
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            {shownPhoneNumber==="" ? <Button variant="primary" onClick={handleAddPhoneNumber}>
              Add Phone Number
            </Button> : 
            <Button variant="primary" onClick={handleAddPhoneNumber}>
            Change Phone Number
              </Button>
            }
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Phone Number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={e=>handleSaveChangesClick(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
        }
      
    </div>
  );
};

export default Profile;
