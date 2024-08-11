import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../features/authSlice';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    const handleLogout = () => {
        dispatch(clearToken());
    };

    return (
        <nav className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-3xl font-bold hover:text-gray-200 transition duration-300">Home</Link>
                
                <div className="hidden md:flex items-center space-x-6">
                    {token ? (
                        <>
                            <Link to="/leads" className="text-white text-lg hover:text-gray-200 transition duration-300">Leads</Link>
                            <button onClick={handleLogout} className="text-white text-lg hover:text-gray-200 transition duration-300">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white text-lg hover:text-gray-200 transition duration-300">Login</Link>
                            <Link to="/register" className="text-white text-lg hover:text-gray-200 transition duration-300">Register</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-90 z-50 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <div className="flex flex-col items-center pt-16">
                    {token ? (
                        <>
                            <Link to="/leads" className="text-white text-lg py-2" onClick={() => setIsOpen(false)}>Leads</Link>
                            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-white text-lg py-2">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white text-lg py-2" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" className="text-white text-lg py-2" onClick={() => setIsOpen(false)}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
