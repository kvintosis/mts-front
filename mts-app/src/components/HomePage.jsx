

import React from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/redactor');
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
                            <button className="home__btn">Добавить файл</button>
                            <button className="home__btn" onClick={handleRedirect}>Конвертировать</button>
                        </div>

                </div>

                <div className="home__container-info-block">

                    <h1 className="home__info" style={{ fontSize: '2.5rem' }}> Информация </h1>

                    <div className="home__container-info">
                        <div className="card">
                            <h3>
                                Как редактировать PDF онлайн
                            </h3>
                            <p>Загрузите свой PDF-файл в систему, и вы <br/> мгновенно получите доступ к его тексту.<br/>
                                При необходимости вы можете отредактировать содержимое прямо на сайте,<br/>
                                а затем сохранить его в удобном для вас формате,<br/> например, DOCX, TXT или других текстовых форматах.</p>
                        </div>



                        <div className="card">
                            <h3>
                                Совместимость с любой системой
                            </h3>
                            <p>Наш инструмент не требует специального программного обеспечения <br/>и работает на всех популярных операционных системах <br/>и браузерах. Достаточно просто зайти на сайт<br/> — и можно приступать к работе.</p>
                        </div>

                        <div className="card">
                            <h3>
                                Поддержка различных форматов
                            </h3>
                            <p>Вы можете загружать PDF-файлы любого типа, <br/> а результат редактирования сохранять в форматах DOCX,<br/> TXT и других текстовых расширениях.</p>
                        </div>
                        <div className="card">
                            <h3>
                                Никаких установок
                            </h3>
                            <p>Все процессы происходят в облаке на наших серверах.<br/> Вам не нужно скачивать или<br/> устанавливать дополнительные программы<br/> — инструмент не нагружает ваше устройство.</p>
                        </div>
                        <div className="card">
                            <h3>
                                Простота и удобство
                            </h3>
                            <p>Мы сделали процесс редактирования PDF максимально простым.<br/> Просто загрузите файл, внесите изменения<br/> и сохраните результат в нужном формате — <br/>никаких сложных настроек!.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};
export default HomePage;