import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Redactor from './pages/Redactor';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    const location = useLocation();
    const noHeaderRoutes = ['/login', '/register'];
    return (
        <>
            {!noHeaderRoutes.includes(location.pathname) && <Header />}
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/redactor" element={<Redactor />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
