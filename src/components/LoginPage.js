import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/authSlice';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/leads';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://etlhivebackend.onrender.com/api/auth/login', { username, password });
            dispatch(setToken(response.data.token));
            toast.success('Login successful!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please try again.');
        }
    };

    const onChangeCaptcha = (value) => {
        setCaptcha(value);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Captcha</label>
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_SITE_KEY}
                            onChange={onChangeCaptcha}
                            className="mb-4"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
                </div>
                <div className="mt-2 text-center">
                    <p className="text-gray-600">Don't have an account? 
                        <Link to="/register" className="text-blue-600 hover:underline ml-1">Register</Link>
                    </p>
                </div>
            </div>
            
        </div>
    );
};

export default LoginPage;
