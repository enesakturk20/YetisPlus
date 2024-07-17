import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './AdminPage.css';

const socket = io('http://localhost:4000');

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:4000/orders');
      const data = await response.json();
      setOrders(data);
    };

    const fetchCarriers = async () => {
      const response = await fetch('http://localhost:4000/carriers');
      const data = await response.json();
      setCarriers(data);
    };

    const fetchUsers = async () => {
      const response = await fetch('http://localhost:4000/auth/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchOrders();
    fetchCarriers();
    fetchUsers();
  }, [newRole]);

  const handleAssignCarrier = async () => {
    const response = await fetch('http://localhost:4000/orders/assignCarrier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: selectedOrder._id,
        carrierId: selectedCarrier._id,
      }),
    });

    const data = await response.json();
    setSelectedOrder(null);
    setSelectedCarrier(null);
  };

  const handleUpdateUserRole = async () => {
    const response = await fetch('http://localhost:4000/auth/users/role', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: selectedUser._id,
        newRole,
      }),
    });

    const data = await response.json();
    setUsers(users.map(user => (user._id === data._id ? data : user)));
    setSelectedUser(null);
    setNewRole('');
  };

  return (
    <div>
      <h1>Admin Page</h1>

      {/* Sipariş Listesi */}
      <ul>
        {orders.map(order => (
          <li key={order._id} onClick={() => setSelectedOrder(order)}>
            {order.products.join(', ')} - {order.status}
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <div>
          <h2>Select Carrier for Order: {selectedOrder._id}</h2>
          <select onChange={(e) => setSelectedCarrier(carriers.find(c => c._id === e.target.value))}>
            <option value="">Select Carrier</option>
            {carriers.map(carrier => (
              <option key={carrier._id} value={carrier._id}>
                {carrier.name}
              </option>
            ))}
          </select>
          <button onClick={handleAssignCarrier}>Assign Carrier</button>
        </div>
      )}

      {/* Kullanıcı Listesi ve Rol Güncelleme */}
      <div>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id} onClick={() => setSelectedUser(user)}>
              {user.username} - {user.role}
            </li>
          ))}
        </ul>
        {selectedUser && (
          <div>
            <h2>Update Role for: {selectedUser.username}</h2>
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="carrier">Carrier</option>
            </select>
            <button onClick={handleUpdateUserRole}>Update Role</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
