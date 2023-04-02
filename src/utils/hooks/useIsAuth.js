import { useSelector } from "react-redux";

const useIsAuth = (isOwner = false, id = '') => {
    const { user } = useSelector(({ user }) => user);
    const { list } = useSelector(({ reviews }) => reviews);

    if (isOwner) {
        return user?.user?.id == list?.find(review => review?.id == id)?.userId;
    }

    return !!user;

};

export default useIsAuth;