import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">404 - Página no encontrada</h1>
            <p className="text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/" className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFound;