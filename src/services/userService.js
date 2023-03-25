import http from '../utils/requestUtils/common';

const register = (userData) => {
    const body = JSON.stringify(userData);

    return http.post('/register', body);
};

const login = (userData) => {
    const body = JSON.stringify(userData);

    return http.post('/login', body);
};

const userService = {
    register,
    login,
};

export default userService;