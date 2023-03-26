import { useParams } from "react-router-dom";

const { default: useIsAuth } = require("utils/hooks/useIsAuth");

const AuthGuard = (props) => {

    const { children, isOwner } = props;
    const params = useParams();
    const id = params?.id;

    const isAuth = useIsAuth(isOwner, id);

    if (isAuth) {
        return (<>{children}</>);
    }

    return (<div>No found or requires authentication</div>);
};


export default AuthGuard;