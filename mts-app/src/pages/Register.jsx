import React, { useState } from "react";
import LogoWh from '../assets/svg-sprite/LogoWh.svg';
import {Link} from "react-router-dom";

function RegisterHeader() {
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

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [surname, setSurname] = useState('');
    const [tg_id, setTg_id] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        const requestBody = {
            email,
            password,
            firstName,
            lastName,
        };

        if (surname.trim()) {
            requestBody.surname = surname;
        }

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Успешная регистрация:', data);

                alert('Вы успешно зарегистрировались!');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Ошибка регистрации');
            }
        } catch (err) {
            console.error('Ошибка: ', err);
            setError('Не удалось подключиться к серверу');
        }
    };

    return (
        <div className="register">
            <RegisterHeader/>
        <div className="register__body">    
        <div className="register__container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <div className="register__form-group">
                    <input
                        type="text" 
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder=""
                        required
                    />
                    <label htmlFor="firstName">Имя:</label>
                </div>
                <div className="register__form-group">
                    <input 
                        type="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder=""
                        required
                    />
                    <label htmlFor="lastName">Фамилия:</label>
                </div>
                <div className="register__form-group">
                    <input 
                        type="surname"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder=""
                        required
                    />
                    <label htmlFor="surname">Отчество:</label>
                </div>
                <div className="register__form-group">
                    <input 
                        type="tg_id"
                        id="tg_id"
                        value={tg_id}
                        onChange={(e) => setTg_id(e.target.value)}
                        placeholder=""
                        required
                    />
                    <label htmlFor="tg_id">Телеграм id:</label>
                </div>
                <div className="register__form-group">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=""
                        required 
                    />
                    <label htmlFor="email">Почта:</label>
                </div>
                <div className="register__form-group">
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
                <div className="register__form-group">
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder=""
                        required
                    />
                    <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                </div>
                {error && <p className="register__error-message">{error}</p>}
                <button type="submit" className="register__button">Зарегистрироваться</button>
            </form>
            <div className="register__back-link">
                <Link to="/login" className="register__back-button">Назад</Link>
            </div>
        </div>
        </div>
        </div>
    );
}

export default Register;