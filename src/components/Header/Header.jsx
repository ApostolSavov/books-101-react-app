import { Link } from "react-router-dom";
import MenuBook from "../../assets/MenuBook.svg";
import useIsAuth from "../../utils/hooks/useIsAuth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/user";

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import "./Header.scss";
import useWindowSize from "utils/hooks/useWindowSize";
import { useState } from "react";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const size = useWindowSize();
    const isAuth = useIsAuth();

    const { user } = useSelector(({ user }) => user);

    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const onLogout = () => {
        dispatch(
            logout()
        );
        navigate('/catalog');
    };

    //extract nav into separate comp

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
            {size.width < 700 && (
                <>
                    <button className="burger-menu-btn" onClick={toggleDrawer}>Menu</button>
                    <Drawer
                        open={isOpen}
                        onClose={toggleDrawer}
                        direction='right'
                        className='drawer'
                    >
                        <div className="header__nav-container">
                            <nav className="header__nav">
                                <ul className="header__nav-list-vertical">

                                    <li className="header__nav-item">
                                        <Link className="header__nav-link" to="/catalog">Catalog</Link>
                                    </li>

                                    <li className="header__nav-item">
                                        <Link className="header__nav-link" to="/reviews">Reviews</Link>
                                    </li>

                                    {isAuth && (
                                        <>
                                            <li className="header__nav-item">
                                                <Link className="header__nav-link" to="/profile">My Reviews</Link>
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
                    </Drawer>
                </>
            )}

            {size.width > 700 && (
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
                                        <Link className="header__nav-link" to={`/profile/${user?.user?.id}`}>My Reviews</Link>
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
            )}
        </header>
    );
};

export default Header;