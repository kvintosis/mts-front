import React from 'react';
import Logo from '../assets/svg-sprite/logo.svg';
import {Link} from "react-router-dom";



function AuthHeader() {
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
            </div>
        </header>
    )
}

export default AuthHeader;