import { Link } from "react-router-dom";
import MenuBook from "../../assets/MenuBook.svg";
import useIsAuth from "../../utils/hooks/useIsAuth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../slices/user";

import "./Header.scss";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuth = useIsAuth();

    const onLogout = () => {
        dispatch(
            logout()
        );
        navigate('/catalog');
    };

    return (
        <header className="header">
            <div className="header__logo-container">
                <Link className="header__logo-link" to="/" >
                    <img src={MenuBook} className="header__logo" alt="logo" />
                    <div className="header__logo-text">
                        <span className="header__logo-text-1">
                            BOOKS
                        </span>
                        <span className="header__logo-text-2">101</span>
                    </div>
                </Link>
            </div>
            <div className="header__nav-container">
                <nav className="header__nav">
                    <ul className="header__nav-list">

                        <li className="header__nav-item">
                            <Link className="header__nav-link" to="/catalog">Catalog</Link>
                        </li>

                        <li className="header__nav-item">
                            <Link className="header__nav-link" to="/reviews">Reviews</Link>
                        </li>

                        {isAuth && (
                            <>
                                <li className="header__nav-item">
                                    <Link className="header__nav-link" to="/profile">My Books</Link>
                                </li>
                                <li className="header__nav-item">
                                    <Link className="header__nav-link" onClick={onLogout} to="/catalog">Logout</Link>
                                </li>
                            </>
                        )}

                        {!isAuth && (

                            <>
                                <li className="header__nav-item">
                                    <Link className="header__nav-link" to="/login">Login</Link>
                                </li>
                                <li className="header__nav-item">
                                    <Link className="header__nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}

                        <li className="header__nav-item">
                            <Link className="header__nav-link" to="/about">About</Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;