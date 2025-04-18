import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Redactor from './pages/Redactor';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const noHeaderRoutes = ['/login', '/register'];
    return (
        <>
            {!noHeaderRoutes.includes(location.pathname) && (
                isAuthenticated ? < AuthHeader /> : <Header />)}
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/redactor" element={<Redactor />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
