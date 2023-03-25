import { useSelector } from "react-redux";

const useIsAuth = () => {
    const { user } = useSelector(({ user }) => user);

    return !!user;

};

export default useIsAuth;