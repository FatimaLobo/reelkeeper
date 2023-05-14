import React from "react";

import { Link, useLocation, useNavigate } from 'react-router-dom';

import "../style/Header.css"
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";


const Header = () => {
    const { auth } = useAuth();
    const isAuthorized = auth.accessToken != null
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        localStorage.setItem("savedUsername", "");
        navigate('/');
    }

    const loginButton = (<>
        <Link to="login" style={{ textDecoration: 'none' }}><span className="nav-link text-white">LOGIN</span></Link>
    </>)

    const listButton = (<>
        <li className="nav-item">
            <Link to="lists" style={{ textDecoration: 'none' }}><span className="nav-link amarillo borde text-white">Lists</span></Link>
        </li>
    </>)

    const moviesButton = (<>
        <li className="nav-item dropdown verde">
            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Movies
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Popular this week</a>
                <a className="dropdown-item" href="#">By genre</a>
                <a className="dropdown-item" href="#">By director</a>
                <a className="dropdown-item" href="#">By country</a>
            </div>
        </li>
    </>)

    const profileButton = (<>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa-solid fa-user mr-2"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="profile" className="dropdown-item" ><span className="nav-link">Go to profile</span></Link>
                <button className="dropdown-item" onClick={signOut}>Sign Out</button>
            </div>
        </li>
    </>)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">

                <div className="container-fluid">

                    <div className="mr-auto">
                        <a className="navbar-brand " href="#">
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <i className="fa-solid fa-film mr-3 text-dark"></i>
                                <span className="display-6 text-dark">ReelKeeper</span>
                            </Link>
                        </a>
                    </div>

                    <button className="navbar-toggler negro" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                    <div className="collapse navbar-collapse col-8" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active rojito borde text-white" aria-current="page" href="#">About</a>
                            </li>

                            {isAuthorized ? listButton : ""}
                            {isAuthorized ? moviesButton : ""}

                            <li className="nav-item purple borde rounded ml-3">
                                {isAuthorized ? profileButton : loginButton}
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header;
