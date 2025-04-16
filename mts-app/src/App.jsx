


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';

function App() {
    return (
        <Router>
            <Header />
            <div style={{ paddingTop: '147px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
