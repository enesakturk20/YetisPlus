import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Map from '../components/Map';
import './UserPage.css';

const socket = io('http://localhost:4000');

const UserPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [carrierLocation, setCarrierLocation] = useState({ lat: 40.9876429, lng: 28.9544895 });
  const [newOrder, setNewOrder] = useState({ products: '' });

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:4000/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();

    socket.on('orderAssigned', (order) => {
      if (order._id === selectedOrder?._id) {
        setSelectedOrder(order);
      }
    });

    socket.on('locationUpdate', (location) => {
      setCarrierLocation(location);
    });

    return () => {
      socket.off('orderAssigned');
      socket.off('locationUpdate');
    };
  }, [selectedOrder]);

  const handleCreateOrder = async () => {
    const response = await fetch('http://localhost:4000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    });

    const data = await response.json();
    setOrders([...orders, data]);
    setNewOrder({ products: '', status: '' });
  };

  return (
    <div>
      <h1>User Page</h1>
      <div>
        <h2>Create New Order</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleCreateOrder(); }}>
          <div>
            <label>Products:</label>
            <input
              type="text"
              value={newOrder.products}
              onChange={(e) => setNewOrder({ ...newOrder, products: e.target.value })}
              required
            />
          </div>
          <button type="submit">Create Order</button>
        </form>
      </div>
      <ul>
        {orders.map(order => (
          <li key={order._id} onClick={() => setSelectedOrder(order)}>
            {order.products.join(', ')} - {order.status}
            <p></p>
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <div>
          <h2>OrderId: {selectedOrder._id}</h2>
            <div>
              <span>CarrierId: {selectedOrder.assignedCarrier ? selectedOrder.assignedCarrier._id : "null"}</span>
            </div>
          <Map carrierLocation={carrierLocation} />
        </div>
      )}
    </div>
  );
};

export default UserPage;
