import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import samplePdf from '../assets/pdf/чм.pdf';

function Redactor() {
    const [viewMode, setViewMode] = useState('view');
    const [text, setText] = useState(`
        <h1>Пример заголовка</h1>
        <p>Это пример содержимого, которое можно редактировать в CKEditor.</p>
        <ul>
            <li>Элемент списка 1</li>
            <li>Элемент списка 2</li>
            <li>Элемент списка 3</li>
        </ul>
        <p><strong>Жирный текст</strong>, <em>курсив</em> и <u>подчёркнутый текст</u>.</p>
        <p>Добавьте <a href="https://example.com">ссылку</a> или изображение ниже:</p>
    `);

    return (
        <div className='redactor'>
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
            </div>

            {viewMode === 'view' && (
                <div className="redactor__view-block">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={samplePdf} />
                    </Worker>
                </div>
            )}

            {viewMode === 'edit' && (
                <div className="redactor__edit-block">
                    <div className="redactor__edit-2">
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

            {viewMode === 'split' && (
                <div className="redactor__split-block">
                    <div className="redactor__nonedit">
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
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