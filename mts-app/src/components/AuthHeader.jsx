import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/svg-sprite/logo.svg';

function AuthHeader() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/ ');
                return;
            }

            try {
                setLoading(true);
                const response = await fetch('https://api', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных пользователя');
                }

                const data = await response.json();
                setUserData(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Ошибка:', err);
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <header className="page-header">
                <div className="page-header__container">
                    <div className="page-header__logo">
                        <Link to="/">
                            <img src={Logo} alt="Логотип" className="page-header__logo-svg" />
                        </Link>
                    </div>
                    <p style={{ fontSize: '16px', fontFamily: '@medium' }}>Загрузка...</p>
                </div>
            </header>
        );
    }

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

                {error ? (
                    <div className="error-message">{error}</div>
                ) : userData ? (
                    <div className="page-header-profile">
                        <span className="page-header-profile__username">
                            {userData.lastName} {userData.firstName} {userData.surname}
                            <br /> Email - {userData.email}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="page-header-profile__btn"
                        >
                            <span className="page-header-profile__btn-text">
                                Выйти из аккаунта
                            </span>
                        </button>
                    </div>
                ) : null}
            </div>
        </header>
    );
}

export default AuthHeader;