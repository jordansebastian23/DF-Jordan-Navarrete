import axios from 'axios';

const API_URL = 'http://localhost:5146/api';

export const login = async (username, password) => {
    const response = await axios.post(
        `${API_URL}/auth/login`,
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
};

export const fetchUsers = async (token) => {
    const response = await axios.get(`${API_URL}/Employee`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteUser = async (id, token) => {
    await axios.delete(`${API_URL}/Employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateUser = async (id, user, token) => {
    const response = await axios.put(
        `${API_URL}/Employee/${id}`,
        user,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const addUser = async (user, token) => {
    const response = await axios.post(
        `${API_URL}/Employee`,
        user,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};