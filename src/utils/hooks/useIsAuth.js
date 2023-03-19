import userService from '../../services/userService';

const useIsAuth = () => {
    return userService.getLocalUser();
};

export default useIsAuth;