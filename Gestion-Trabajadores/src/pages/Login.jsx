import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                setError('Error en la autenticación');
            }
        } catch (err) {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-indigo-900">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-4 md:mx-0">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Ingresa tu usuario"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;