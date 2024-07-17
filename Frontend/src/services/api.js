const API_URL = 'http://localhost:4000';

export const loginUser = (userData) =>
    fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }).then(res => res.json());

export const getOrders = () =>
    fetch(`${API_URL}/orders`).then(res => res.json());

export const createOrder = (orderData) =>
    fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    }).then(res => res.json());

export const assignCarrier = (data) =>
    fetch(`${API_URL}/orders/assignCarrier`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json());

export const getCarriers = () =>
    fetch(`${API_URL}/carriers`).then(res => res.json());
