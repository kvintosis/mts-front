import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Redactor from './pages/Redactor';

function App() {
    return (
        <Router>
            <Header />
            <div style={{ paddingTop: '147px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/redactor" element={<Redactor />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
