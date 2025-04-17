import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState(null); // Сохраняем ID или URL файла
    const navigate = useNavigate();

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
                    setFileId(result.fileId); // Сохраняем ID или URL файла
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
                const response = await fetch(`api/files/${fileId}`); // Получаем файл с сервера
                if (response.ok) {
                    const fileBlob = await response.blob();
                    console.log('Файл успешно получен:', fileBlob);
                    navigate('/redactor', { state: { fileBlob } }); // Передаем файл в редактор
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

    return (
        <div className="home-wrapper">
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
                        {!file ? (
                            <>
                                {/* Кнопка "Добавить файл" */}
                                <label className="home__btn">
                                    Добавить файл
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </>
                        ) : (
                            <>
                                {/* Краткое описание файла */}
                                <div className="home__file-info">
                                    <p><strong>Имя файла:</strong> {file.name}</p>
                                    <p><strong>Размер файла:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                                </div>

                                {/* Кнопка "Конвертировать" */}
                                <button className="home__btn" onClick={handleConvert}>
                                    Конвертировать
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="home__container-info-block">
                    <h1 className="home__info" style={{ fontSize: '2.5rem' }}> Информация </h1>
                    <div className="home__container-info">
                        <div className="card">
                            <h3>Как редактировать PDF онлайн</h3>
                            <p>
                                Загрузите свой PDF-файл в систему, и вы <br /> мгновенно получите доступ к его тексту.<br />
                                При необходимости вы можете отредактировать содержимое прямо на сайте,<br />
                                а затем сохранить его в удобном для вас формате,<br /> например, DOCX, TXT или других текстовых форматах.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Совместимость с любой системой</h3>
                            <p>
                                Наш инструмент не требует специального программного обеспечения <br />и работает на всех популярных операционных системах <br />и браузерах. Достаточно просто зайти на сайт<br /> — и можно приступать к работе.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Поддержка различных форматов</h3>
                            <p>
                                Вы можете загружать PDF-файлы любого типа, <br /> а результат редактирования сохранять в форматах DOCX,<br /> TXT и других текстовых расширениях.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Никаких установок</h3>
                            <p>
                                Все процессы происходят в облаке на наших серверах.<br /> Вам не нужно скачивать или<br /> устанавливать дополнительные программы<br /> — инструмент не нагружает ваше устройство.
                            </p>
                        </div>
                        <div className="card">
                            <h3>Простота и удобство</h3>
                            <p>
                                Мы сделали процесс редактирования PDF максимально простым.<br /> Просто загрузите файл, внесите изменения<br /> и сохраните результат в нужном формате — <br />никаких сложных настроек!.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;