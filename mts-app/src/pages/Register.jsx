import React, { iseState, useState } from "react";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setError('Пароли не совпадают');
            return;
        }

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Успешная регистрация:', data);

                alert('Вы успешно зарегистрировались!');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Ошибка регистрации');
            }
        } catch (err){
            console.error('Ошибка: ', err);
            setError('Не удалось подключиться к серверу');
        }
    };

    return (
        <div className="register__container">
            <h2 className="register__text">Регистрация</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <div className="register__form-group">
                    <label htmlFor="firstName">Имя: </label>
                    <input
                        type="text" 
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="register__form-group">
                    <label htmlFor="lastName">Фамилия:</label>
                    <input 
                        type="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                </div>
                <div className="register__form-group">
                    <label htmlFor="email">Почта:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div className="register__form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className="register__form-group">
                    <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="register__error-message">{error}</p>}
                <button type="submit" className="register__button">Зарегистрироваться</button>
            </form>
        </div>
    );
}

export default Register;