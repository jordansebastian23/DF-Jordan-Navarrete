import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token no encontrado');
                return;
            }
            const response = await axios.get('http://localhost:5146/api/Employee', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            setError('No se pudo cargar la lista de usuarios');
        }
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5146/api/Employee/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            setError('No se pudo eliminar el usuario');
        }
    };

    const openModal = (user) => {
        setUserToEdit(user);
        setName(user.name);
        setEmail(user.email);
        setDepartment(user.department);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUserToEdit(null);
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5146/api/Employee/${userToEdit.id}`, {
                name, email, department
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user => (user.id === userToEdit.id ? response.data : user)));
            closeModal();
        } catch (err) {
            setError('No se pudo actualizar el usuario');
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5146/api/Employee', {
                name, email, department
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers([...users, response.data]);
            setName('');
            setEmail('');
            setDepartment('');
        } catch (err) {
            setError('No se pudo añadir el usuario');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirige a la página de inicio de sesión
    };

    const departmentCounts = users.reduce((acc, user) => {
        acc[user.department] = (acc[user.department] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-6 shadow-lg flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-6 text-center">Menú</h2>
                    <ul className="text-center">
                        <li className="mb-4">
                            <a href="/Dashboard" className="flex items-center justify-center p-2 hover:bg-gray-700 rounded-lg transition duration-200">
                                <span>Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="mt-auto">
                    <button onClick={logout} className="w-full bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">Cerrar Sesión</button>
                </div>
            </aside>

            <main className="flex-1 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard gestion de empleados</h1>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-sm font-semibold text-gray-700">Total Usuarios</h3>
                        <p className="text-lg font-bold text-gray-900">{users.length}</p>
                    </div>
                    {Object.entries(departmentCounts).map(([dept, count]) => (
                        <div key={dept} className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h3 className="text-sm font-semibold text-gray-700">{dept}</h3>
                            <p className="text-lg font-bold text-gray-900">{count}</p>
                        </div>
                    ))}
                </div>

                <form onSubmit={addUser} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-md mx-auto">
    <div className="grid grid-cols-1 gap-4">
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded-lg w-full" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded-lg w-full" required />
        <input type="text" placeholder="Departamento" value={department} onChange={(e) => setDepartment(e.target.value)} className="border p-2 rounded-lg w-full" required />
    </div>
    <button type="submit" className="mt-4 w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300">
        Añadir Usuario
    </button>
</form>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left text-gray-700">Nombre</th>
                                <th className="p-3 text-left text-gray-700">Email</th>
                                <th className="p-3 text-left text-gray-700">Departamento</th>
                                <th className="p-3 text-left text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-200">
                                        <td className="p-3 text-gray-800">{user.name}</td>
                                        <td className="p-3 text-gray-800">{user.email}</td>
                                        <td className="p-3 text-gray-800">{user.department}</td>
                                        <td className="p-3">
                                            <button onClick={() => openModal(user)} className="bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-200">Editar</button>
                                            <button onClick={() => deleteUser(user.id)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200">Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-3 text-center text-gray-700">No hay usuarios disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeModal}>
                    <div className="bg-white p-6 rounded-lg shadow-md" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-semibold text-gray-700">Editar Usuario</h3>
                        <form onSubmit={handleEditUser}>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded-lg w-full mb-2" required />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded-lg w-full mb-2" required />
                            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="border p-2 rounded-lg w-full mb-2" required />
                            <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Guardar</button>
                        </form>
                        <button onClick={closeModal} className="mt-2 text-sm text-red-500 hover:text-red-700">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;