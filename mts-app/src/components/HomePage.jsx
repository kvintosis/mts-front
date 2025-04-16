import React from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/redactor'); 
    };

    return (
        <div className="home__container">
            <div className="home__btn-container">
                <button className="home__btn">добавить файл</button>
                <button className="home__btn" onClick={handleRedirect}>Конвертировать</button>
            </div>
        </div>
    )
}
export default HomePage;