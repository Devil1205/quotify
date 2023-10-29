import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../actions/index'

function Navbar({ verifyUser, message, updateMessage }) {

    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.isDark);
    const [user, setUser] = useState(false);
    const navigate = useNavigate();

    const [menuVisible, setMenuVisible] = useState(false);

    const slidingMenu = () => {
        let menu = document.querySelector('.slidingMenu');
        if (menuVisible === false) {
            menu.style.transform = `translatex(-250px)`;
            setMenuVisible(true);
        }
        else {
            menu.style.transform = `translatex(250px)`;
            setMenuVisible(false);
        }
    }

    const verify = async () => {
        const result = await verifyUser();
        // console.log(result);
        if (result !== false) {
            setUser(result);
        }
    };

    const location = useLocation().pathname;
    // console.log(isDark);
    // console.log(localStorage.getItem('isDark'));

    const body = document.querySelector('body');
    body.style.backgroundColor = isDark?"#000023":"#f1f1f9";
    body.style.color = isDark?"white":"black";
    useEffect(() => {
        verify();
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [location])


    const logoutUser = () => {
        localStorage.removeItem('auth-token');
        setUser(false);
        updateMessage("success", "Logged out successfully")
    }

    return (
        <nav className={`navbar navbar-expand-lg ${isDark ? "navbar-dark" : "navbar-light"}`} >
            <div className='message'>
                {message && <div className={`alert alert-${message.type === 'success' ? message.type : "danger"}`} role='alert'>{`${message.type} : ${message.message}`}</div>}
            </div>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Quotify</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/' ? 'bold' : ""} ${isDark ? "text-white" : "text-black"}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/quotes' ? 'bold' : ""} ${isDark ? "text-white" : "text-black"}`} to="quotes">All Quotes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/my_quotes' ? 'bold' : ""} ${isDark ? "text-white" : "text-black"}`} to="my_quotes">My Quotes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/new_quote' ? 'bold' : ""} ${isDark ? "text-white" : "text-black"}`} to="new_quote">Write a Quote</Link>
                        </li>
                        <div className='profile nav-link'>
                            {user === false ? <AccountCircleIcon fontSize='large' color='primary' onClick={() => { navigate('/user') }} /> :
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Profile
                                    </div>
                                    <ul className="dropdown-menu">
                                        <li><div className="dropdown-item">{user.name}</div></li>
                                        <li><div className="dropdown-item">{user.email}</div></li>
                                        <li><div className="dropdown-item">{user.phone}</div></li>
                                        <li><div className="dropdown-item" onClick={logoutUser}>Logout</div></li>
                                    </ul>
                                </li>}
                        </div>
                    </ul>
                    <div className="form-check form-switch" onClick={() => { dispatch(toggleTheme()); }}>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked={isDark} />
                        <label className={`form-check-label ${isDark ? "text-white" : "text-black"}`} htmlFor="flexSwitchCheckDefault">Dark</label>
                    </div>
                </div>
            </div>

            <div className='w-100 d-flex justify-content-end' style={{ position: "absolute", padding: "0px 10px" }}>
                <button className="navbar-toggler" type="button" onClick={slidingMenu} style={{filter: "invert(0)"}} >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`slidingMenu text-center boxShadow ${isDark ? "slidingMenu-dark" : "slidingMenu-light"}`} style={{ borderRadius: "0px" }}>
                    <button className="navbar-toggler" type="button" onClick={slidingMenu} style={{ position: "relative", border: "none", right: "-40%", top: "5px", filter: "invert(0)", zIndex: "2" }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand custom-Brand primary-font d-block m-0 py-2" to="/" onClick={() => { slidingMenu() }} style={{ position: "relative", top: "-10px", width: "fit-content", left: "31%" }}> Quotify </Link>
                    <hr className="border border-white border-1 opacity-100 m-0" />
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/' ? 'bold' : ""} ${isDark ? "text-white" : "text-black"}`} aria-current="page" to="/" onClick={slidingMenu}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/quotes' ? 'bold' : ""} ${isDark ? "text-white" : "text-black"}`} to="quotes" onClick={slidingMenu}>All Quotes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/my_quotes' ? 'bold' : ""} ${isDark ? "text-white" : "text-black"}`} to="my_quotes" onClick={slidingMenu}>My Quotes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/new_quote' ? 'bold' : ""} ${isDark ? "text-white" : "text-black"}`} to="new_quote" onClick={slidingMenu}>Write a Quote</Link>
                        </li>
                        <div className='profile nav-link m-auto'>
                            {user === false ? <AccountCircleIcon fontSize='large' color='primary' onClick={() => { navigate('/user') }} /> :
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Profile
                                    </div>
                                    <ul className="dropdown-menu">
                                        <li><div className="dropdown-item">{user.name}</div></li>
                                        <li><div className="dropdown-item">{user.email}</div></li>
                                        <li><div className="dropdown-item">{user.phone}</div></li>
                                        <li><div className="dropdown-item" onClick={logoutUser}>Logout</div></li>
                                    </ul>
                                </li>}
                        </div>
                    </ul>
                    <div className="form-check form-switch m-auto" onClick={() => { dispatch(toggleTheme()) }} style={{width: "fit-content"}}>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked={isDark} />
                        <label className={`form-check-label ${isDark ? "text-white" : "text-black"}`} htmlFor="flexSwitchCheckDefault">Dark</label>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar