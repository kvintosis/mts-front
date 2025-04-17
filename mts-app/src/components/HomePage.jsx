

import React from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/redactor');
    };

    return (
        <div className="home">
            <h1>Конвертировать изображения в PDF</h1>
            <h2>НЕ КОНВЕРТЕР, А КОНВЕРТИЩЕ</h2>

            <div className="home__features">
                <span className="feature-badge">✓ Быстро </span>
                <span className="feature-badge">✓ Онлайн </span>
                <span className="feature-badge">✓ Безопасно </span>
            </div>

            <div className="home__container">

                    <div className="home__btn-container">
                        <button className="home__btn">добавить файл</button>
                        <button className="home__btn" onClick={handleRedirect}>Конвертировать</button>
                    </div>

            </div>

            <div className="home__container-info-block">

                <h1 className="home__info"> Информация </h1>

                <div className="home__container-info">


                </div>
            </div>
        </div>
    )
};
export default HomePage;