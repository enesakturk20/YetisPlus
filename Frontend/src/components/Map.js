import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Map.css';

const Map = ({ carrierLocation }) => {
  console.log(carrierLocation);
  const [location, setLocation] = useState(carrierLocation);

  useEffect(() => {
    setLocation(carrierLocation);
  }, [carrierLocation]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAc-ZWKKtP6Tt8pk5HH19QzvXDVj9tL91s">
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        zoom={15}
        center={location}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
