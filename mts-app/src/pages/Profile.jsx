import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Vector from "../assets/svg-sprite/Vector.svg";

function Profile() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState(null);
    const [serverFiles, setServerFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('https://api');
                if (!response.ok) {
                    throw new Error('Ошибка загрузки файлов');
                }
                const data = await response.json();
                setServerFiles(data.files || []);
            } catch (err) {
                setError(err.message);
                console.error('Ошибка при загрузке файлов:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, []);

    // Фильтр поиска
    const filteredFiles = serverFiles.filter(serverFile =>
        serverFile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);

            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await fetch('api', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Файл успешно отправлен:', result);
                    setFileId(result.fileId);
                } else {
                    console.error('Ошибка при отправке файла:', response.statusText);
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
            }
        } else {
            alert('Пожалуйста, выберите PDF-файл.');
        }
    };

    const handleConvert = async () => {
        if (fileId) {
            try {
                const response = await fetch(`api/files/${fileId}`);
                if (response.ok) {
                    const fileBlob = await response.blob();
                    console.log('Файл успешно получен:', fileBlob);
                    navigate('/redactor', { state: { fileBlob } });
                } else {
                    console.error('Ошибка при получении файла:', response.statusText);
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
            }
        } else {
            alert('Файл не найден. Пожалуйста, загрузите файл.');
        }
    };

    // Выбор файлов из рез поиска
    const handleFileSelect = async (selectedFile) => {
        try {
            // Получаем файл с сервера
            const response = await fetch(`api/files/${selectedFile.id}`);

            if (response.ok) {
                const fileBlob = await response.blob();
                console.log('Файл успешно получен:', fileBlob);

                // Переходим в редактор с данными файла
                navigate('/redactor', {
                    state: {
                        fileBlob,
                        fileName: selectedFile.name,
                        fileId: selectedFile.id
                    }
                });
            } else {
                console.error('Ошибка при получении файла:', response.statusText);
                alert('Не удалось загрузить файл');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
            alert('Произошла ошибка при загрузке файла');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Выполнен поиск:', searchQuery);
    };

    const handleRedirect = () => {
        navigate('/redactor');
    };

    return (
        <div className="profile" style={{paddingTop: '147px'}}>
            <div className="profile__poisk">
                <h1>Поиск</h1>

                <form className="search-container" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Название документа"
                        aria-label="Поиск документов"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="search-btn" type="submit" aria-label="Найти">
                        <img src={Vector} alt="Поиск"/>
                    </button>
                </form>

                {searchQuery && (
                    <div className="search-results">
                        {isLoading ? (
                            <p>Загрузка...</p>
                        ) : error ? (


                            <p>ошибка!!!</p>
                        ) : filteredFiles.length > 0 ? (
                            <ul>
                                {filteredFiles.map(file => (
                                    <li key={file.id}>
                                        <span>{file.name}</span>
                                        <button onClick={() => handleFileSelect(file)}>
                                            Открыть
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Ничего не найдено</p>
                        )}
                    </div>
                )}
            </div>
            <hr className="line"/>
            <div className="profile__file-case">
                <button className="profile__file-case-btn" onClick={handleRedirect}>
                    Редактировать
                </button>
            </div>
        </div>
    );
}

export default Profile;