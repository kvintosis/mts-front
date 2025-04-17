import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import samplePdf from '../assets/pdf/чм.pdf';

function Redactor() {
    const [viewMode, setViewMode] = useState('view');
    const [text, setText] = useState('');
    const [saveStatus, setSaveStatus] = useState('');

    const fetchHtmlFromDB = async () => {
        try {
            const response = await fetch('https://your-api-endpoint.com/get-html-file');
            if (response.ok) {
                const html = await response.text();
                setText(html);
            } else {
                console.error('Ошибка при загрузке HTML-файла:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при подключении к серверу:', error);
        }
    };

    const handleSaveHtmlFileToDB = async () => {
        try {
            const formData = new FormData();
            const blob = new Blob([text], { type: 'text/html' });
            formData.append('file', blob, 'edited-file.html');

            const response = await fetch('https://your-api-endpoint.com/save-html-file', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSaveStatus('Сохранено успешно!');
            } else {
                const errorData = await response.text();
                setSaveStatus(`Ошибка: ${errorData || 'Не удалось сохранить файл'}`);
            }
        } catch (error) {
            console.error('Ошибка при сохранении файла:', error);
            setSaveStatus('Ошибка при подключении к серверу');
        }
    };

    useEffect(() => {
        fetchHtmlFromDB();
    }, []);

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

                <button className="redactor__save-btn btn" onClick={handleSaveHtmlFileToDB}>
                    Сохранить
                    </button>
            </div>

            {viewMode === 'view' && (
                <div className="redactor__view-block">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={samplePdf} />
                    </Worker>
                </div>
            )}

            {viewMode === 'edit' && (
                <div className="redactor__edit-block">
                    <CKEditor
                        editor={ClassicEditor}
                        data={text}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText(data);
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
                            <Viewer fileUrl={samplePdf} />
                        </Worker>
                    </div>

                    <div className="redactor__edit-1">
                        <CKEditor
                            editor={ClassicEditor}
                            data={text}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setText(data);
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