import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LeadApplication from './pages/LeadApplication';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

const App = () => {
    return (
        <Router>
            <Toaster /> 
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                    path="/leads" 
                    element={
                        <PrivateRoute>
                            <LeadApplication />
                        </PrivateRoute>
                    } 
                />
                <Route path="/" element={<Navigate to="/leads" />} />
            </Routes>
            
        </Router>
    );
};

export default App;
