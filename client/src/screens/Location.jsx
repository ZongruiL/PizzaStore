import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Location = () => {
  const location = { lat: 49.2540, lng: -122.9186 }; 
  const apiKey = 'AIzaSyCvYh_LeypQd9Pz6IK0yhbeoq05SfEKWE4'; 

  

  return (
    <div>
      <br/>
      <h1 style={{ textAlign: "center" }}>Location</h1>

      <br/>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          id="location-map"
          mapContainerStyle={{
            width: '100%',
            height: '400px',
          }}
          zoom={15}
          center={location}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
      
    </div>
    
  );
};

export default Location;