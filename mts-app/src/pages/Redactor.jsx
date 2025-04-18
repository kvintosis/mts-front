import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function Redactor() {
    const [viewMode, setViewMode] = useState('view'); // Добавлено состояние для режима отображения
    const [fileUrl, setFileUrl] = useState(null);
    const [htmlContent, setHtmlContent] = useState('<p>Добро пожаловать в редактор! Начните редактирование здесь.</p>'); // Начальный HTML-контент

    useEffect(() => {
        const pdfData = localStorage.getItem('pdfFile');
        if (pdfData) {
            setFileUrl(pdfData); // Устанавливаем PDF
        } else {
            alert('Файл не найден. Пожалуйста, загрузите файл на главной странице.');
        }

        // Извлекаем HTML из localStorage, если он есть
        const savedHtml = localStorage.getItem('htmlFile');
        if (savedHtml) {
            setHtmlContent(savedHtml); // Устанавливаем сохранённый HTML
        }
    }, []);

    const handleSaveHtmlFileToLocalStorage = () => {
        localStorage.setItem('htmlFile', htmlContent); // Сохраняем HTML в localStorage
        alert('HTML успешно сохранён!');
    };

    return (
        <div className="redactor">
            <div className="redactor__btn-block">
                <button
                    className={`redactor__view-btn btn ${viewMode === 'view' ? 'active' : ''}`}
                    onClick={() => setViewMode('view')}
                >
                    Исходный файл
                </button>
                <button
                    className={`redactor__edit-btn btn ${viewMode === 'edit' ? 'active' : ''}`}
                    onClick={() => setViewMode('edit')}
                >
                    Редактировать
                </button>
                <button
                    className={`redactor__split-btn btn ${viewMode === 'split' ? 'active' : ''}`}
                    onClick={() => setViewMode('split')}
                >
                    Сплит
                </button>
                <button className="redactor__save-btn btn" onClick={handleSaveHtmlFileToLocalStorage}>
                    Сохранить
                </button>
            </div>

            {viewMode === 'view' && (
                <div className="redactor__view-block">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                        {fileUrl ? (
                            <Viewer fileUrl={fileUrl} />
                        ) : (
                            <p>Файл не загружен</p>
                        )}
                    </Worker>
                </div>
            )}

            {viewMode === 'edit' && (
                <div className="redactor__edit-block">
                    <CKEditor
                        editor={ClassicEditor}
                        data={htmlContent} // Устанавливаем начальный HTML-контент
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setHtmlContent(data); // Обновляем HTML-контент при изменении
                        }}
                        config={{
                            toolbar: [
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'underline',
                                'link',
                                'bulletedList',
                                'numberedList',
                                '|',
                                'blockQuote',
                                'insertTable',
                                'undo',
                                'redo',
                            ],
                        }}
                    />
                </div>
            )}

            {viewMode === 'split' && (
                <div className="redactor__split-block">
                    <div className="redactor__nonedit">
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                            {fileUrl ? (
                                <Viewer fileUrl={fileUrl} />
                            ) : (
                                <p>Файл не загружен</p>
                            )}
                        </Worker>
                    </div>

                    <div className="redactor__edit-1">
                        <CKEditor
                            editor={ClassicEditor}
                            data={htmlContent} // Устанавливаем начальный HTML-контент
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setHtmlContent(data); // Обновляем HTML-контент при изменении
                            }}
                            config={{
                                toolbar: [
                                    'heading',
                                    '|',
                                    'bold',
                                    'italic',
                                    'underline',
                                    'link',
                                    'bulletedList',
                                    'numberedList',
                                    '|',
                                    'blockQuote',
                                    'insertTable',
                                    'undo',
                                    'redo',
                                ],
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Redactor;