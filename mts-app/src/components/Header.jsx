

import React from 'react';


function Header() {
    return (
        <header className="page-header">
            <div className="page-header__container">

                <div className="page-header__logo">
                    <span>logotip</span>
                </div>

                <nav className="page-header__nav">
                    <ul className="page-header__menu">
                        <li className="page-header__menu-item">
                            <a href="/" className="page-header__link">1</a>
                        </li>
                        <li className="page-header__menu-item">
                            <a href="/" className="page-header__link">2</a>
                        </li>
                        <li className="page-header__menu-item">
                            <a href="/" className="page-header__link">3</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default Header;