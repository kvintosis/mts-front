

import React from 'react';
import Logo from '../assets/svg-sprite/logo.svg';
import {Link} from "react-router-dom";



function Header() {
    return (
        <header className="page-header">
            <div className="page-header__container">

                <div className="page-header__logo">
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="Логотип"
                            className="page-header__logo-svg"
                        />
                    </Link>
                </div>

                <Link to="/login" className="page-header__join-btn">
                   <span className="page-header__join-btn-text">Войти</span>
                </Link>
            </div>
        </header>
    )
}

export default Header;