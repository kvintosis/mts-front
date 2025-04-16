

import React from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/redactor');
    };

    return (
        <div className="home">
            <div className="home__container">
                <h1>Конвертировать изображения в PDF</h1>
                <h2>что-то написано ....</h2>
                <div className="home__container-description">
                    <i>Онлайн</i>
                    <i>Беспалтно</i>
                    <i>Быстро</i>
                </div>

                <div className="home__form">

                        <div className="home__btn-container">
                            <button className="home__btn">добавить файл</button>
                        </div>
                </div>
        <div className="home__container">
            <div className="home__btn-container">
                <button className="home__btn">добавить файл</button>
                <button className="home__btn" onClick={handleRedirect}>Конвертировать</button>
            </div>
        </div>
    )
}
export default HomePage;