import React, { useState } from "react";
import LogoWh from '../assets/svg-sprite/LogoWh.svg';
import {Link} from "react-router-dom";


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

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
        });

        if (response.ok){
            const data = await response.json();
            console.log('Успешный вход:', data);

            localStorage.setItem('token', data.token);
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