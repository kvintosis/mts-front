import React, { useState } from "react";

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
        <div className="login__container">
            <h2>Вход</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <div className="login__form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        />
                </div>
                <div className="login__form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                        />
                </div>
                {error && <p className="login__error-message">{error}</p>}
                <button type="submit" className="login__button">Войти</button>
            </form>
        </div>
    );
}

export default Login;