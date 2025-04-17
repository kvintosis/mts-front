import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


function Redactor() {
    const [viewMode, setViewMode] = useState('view');
    const [text, setText] = useState('');
    
    const handleEditorChange = (content) => {
        setText(content);
    };

    return(
        <>
        <div className='redactor__btn-block'>
            <button className='redactor__view-btn btn' onClick={() => setViewMode('view')}>Исходный файл</button>
            <button className='redactor__edit-btn btn' onClick={() => setViewMode('edit')}>Редактировать</button>
            <button className='redactor__split-btn btn' onClick={() => setViewMode('split')}>Сплит</button>
        </div>

        {viewMode === 'view' && (
                <div className='redactor__view-block'>
                    {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={''}/>
                    </Worker> */}
                </div>
            )}

        {viewMode === 'edit' && (
                <div className='redactor__edit-block'>
                    <div className='redactor__edit-1'>
                        {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={''}/>
                        </Worker> */}
                    </div>

                    <div className='redactor__edit-2'>
                        <Editor 
                            apiKey="5ia8up91gwwy7ep71lhyv31p06mdtuv3urofzu9ikjrgcxyf"
                            value={text}
                            init={{
                                height: '100%',
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help',
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            )}

            {viewMode === 'split' && (
                <div className='redactor__split-block'>
                    <div className='redactor__nonedit'>
                        {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={''} />
                        </Worker> */}
                    </div>

                    <div className='redactor__edit-block'>
                        <div className='redactor__edit-1'>
                            {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
                                <Viewer fileUrl={pdfFile2} />
                            </Worker> */}
                        </div>

                        <div className='redactor__edit-2'>
                            <Editor
                                apiKey="5ia8up91gwwy7ep71lhyv31p06mdtuv3urofzu9ikjrgcxyf"
                                value={text}
                                init={{
                                    height: '100%',
                                    menubar: true,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount',
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help',
                                }}
                                onEditorChange={handleEditorChange}
                                />
                        </div>
                    </div>
                    </div>
            )}
    </>
    );
}

export default Redactor;