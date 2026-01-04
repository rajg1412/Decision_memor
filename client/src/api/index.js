import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);
export const fetchDecisions = () => API.get('/decisions');
export const createDecision = (newDecision) => API.post('/decisions', newDecision);
export const updateDecision = (id, updatedDecision) => API.patch(`/decisions/${id}`, updatedDecision);
export const deleteDecision = (id) => API.delete(`/decisions/${id}`);
