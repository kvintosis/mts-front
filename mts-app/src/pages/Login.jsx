import React, { useState } from "react";
import LogoWh from '../assets/svg-sprite/LogoWh.svg';
import { Link, useNavigate } from "react-router-dom";


function LoginHeader() {
    return (
        <header className="login-header">
        <div className="login-header__container">
        <div className="login-header__logo">
            <Link to="/">
                <img
                src={LogoWh}
                alt="Логотип"
                className="login-header__logo-svg"
                />
            </Link>
        </div>
        </div>
        </header>
    );
}

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new URLSearchParams();
            formData.append('username', email); 
            formData.append('password', password);
            const response = await fetch('http://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
        });

        if (response.ok){
            const data = await response.json();
            console.log('Успешный вход:', data);

            localStorage.setItem('access_token', data.access_token);
            setIsAuthenticated(true);
            navigate('/profile');
            alert('Вы успешно вошли!');
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'Ошибка входа');
            }
        } catch (err){
            console.error('Ошибка: ', err);
            setError('Не удалось подключитсья к серверу');
        }
    };

    return(
        <>
        <div className="login">
            <LoginHeader />
        <div className="login__body">
        <div className="login__container">
            <h2>Вход</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <div className="login__form-group">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=""
                        required 
                        />
                    <label htmlFor="email">Email:</label>
                </div>
                <div className="login__form-group">
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    required
                        />
                    <label htmlFor="password">Пароль:</label>

                </div>
                {error && <p className="login__error-message">{error}</p>}
                <button type="submit" className="login__button">Войти</button>
            </form>
            <div className="login__register-link">
                <p>Нет аккаунта?</p>
                <Link to="/register" className="login__register__button">Создать аккаунт</Link>
            </div>
            <div className="register__back-link">
                <Link to="/" className="register__back-button">Назад</Link>
            </div>
        </div>
        </div>
        </div>
        </>
    );
}

export default Login;