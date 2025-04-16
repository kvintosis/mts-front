

import React from 'react';


function Header() {
    return (
        <header className="page-header">
            <div className="page-header__container">

                <div className="page-header__logo">
                    <span>logotip</span>
                </div>

                <Link to="/login" className="page-header__join-btn">
                    <span className="page-header__join-btn-text">Войти</span>
                </Link>
            </div>
        </header>
    )
}

export default Header;