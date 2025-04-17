



import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/redactor');
    };

    return (
        <div className="profile" style={{ paddingTop: '147px' }}>
            <div className="profile__poisk">
                <h1>Поиск</h1>

                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Название документа"
                        aria-label="Поиск документов"
                        onChange={handleRedirect}
                    />
                    <button className="search-btn" type="submit" aria-label="Найти"></button>
                </div>
            </div>
            <div className="profile__file">
                <div className="profile__file-case">
                    <button className="profile__file-case-btn" onClick={handleRedirect}>Редактировать</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;