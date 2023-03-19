import http from '../utils/requestUtils/common';

const register = (userData) => {
    const body = JSON.stringify(userData);

    return http.post('/users', body)
        .then(({ data }) => {
            localStorage.setItem('userData', JSON.stringify(data));
            window.dispatchEvent(new Event('storage'));
        });
};

const login = (userData) => {
    const body = JSON.stringify(userData);

    return http.post('/login', body)
        .then(({ data }) => {
            localStorage.setItem('userData', JSON.stringify(data));
            window.dispatchEvent(new Event('storage'));
        });
};

const logout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('storage'));
};

const getLocalUser = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : userData;
};

const userService = {

    register,
    login,
    logout,
    getLocalUser

};

export default userService;