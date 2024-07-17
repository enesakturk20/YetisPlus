import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './CarrierPage.css';

const socket = io('http://localhost:4000');

const CarrierPage = () => {
  const [orders, setOrders] = useState([]);
  const [location, setLocation] = useState({ lat: 40.9876429, lng: 28.9544895 });
  const [isActive, setIsActive] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.user);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:4000/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude);
        setLocation({ lat: latitude, lng: longitude });
        socket.emit('locationUpdate', { lat: latitude, lng: longitude });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off('locationUpdate');
    };
  }, []);

  const handleToggleActive = async () => {
    setIsActive(!isActive);
    await fetch('http://localhost:4000/carriers/activeStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user.user.id, isActive: !isActive }),
    });
  };

  return (
    <div>
      <h1>Carrier Page</h1>
      <button onClick={handleToggleActive}>
        {isActive ? 'Deactivate' : 'Activate'}
      </button>
      <h2>Assigned Orders</h2>
      <ul>
        {orders.filter(order => order.assignedCarrier && order.assignedCarrier.isActive).map(order => (
          <li key={order._id}>
            {order.products.join(', ')} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarrierPage;
