import axios from "axios";



const requester = (method, url, body) => {
    const persistedUser = localStorage.getItem('user');
    const token = persistedUser ? JSON.parse(persistedUser)?.accessToken : null;
    const headers = {
        "Content-type": "application/json",
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    console.log({ env: process.env });

    console.log({ api: process.env.api });

    const httpInstance = axios.create({
        // baseURL: 'http://localhost:4000/api',
        baseURL: 'https://books-json-server.onrender.com/api',
        headers
    });

    return httpInstance[method](url, body);
};

export default {
    get: requester.bind(null, 'get'),
    post: requester.bind(null, 'post'),
    put: requester.bind(null, 'put'),
    patch: requester.bind(null, 'patch'),
    delete: requester.bind(null, 'delete'),
};