import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser, updateUser, addUser } from '../services/api';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token no encontrado");
                return;
            }
            const data = await fetchUsers(token);
            setUsers(data);
        } catch (err) {
            setError("No se pudo cargar la lista de usuarios");
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await deleteUser(id, token);
            setUsers(users.filter((user) => user.id !== id));
        } catch (err) {
            setError("No se pudo eliminar el usuario");
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
        setName("");
        setEmail("");
        setDepartment("");
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const updatedUser = await updateUser(userToEdit.id, { name, email, department }, token);
            setUsers(users.map((user) => (user.id === userToEdit.id ? updatedUser : user)));
            closeModal();
        } catch (err) {
            setError("No se pudo actualizar el usuario");
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const newUser = await addUser({ name, email, department }, token);
            setUsers([...users, newUser]);
            setName("");
            setEmail("");
            setDepartment("");
        } catch (err) {
            setError("No se pudo añadir el usuario");
        }
    };

    const departmentCounts = users.reduce((acc, user) => {
        acc[user.department] = (acc[user.department] || 0) + 1;
        return acc;
    }, {});

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex bg-gray-100 relative">
            {/* Botón de menú hamburguesa para móviles */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-lg z-50">
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`w-64 bg-gray-800 text-white min-h-screen p-6 shadow-lg flex flex-col fixed top-0 left-0 transform transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0`}>
                <h2 className="text-2xl font-bold mb-8 text-center">Menú</h2>
                <ul className="space-y-3 flex-1">
                    <li>
                        <a href="#" className="block p-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-700 hover:text-blue-400">
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-700 hover:text-blue-400">
                            Usuarios
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-700 hover:text-blue-400">
                            Reportes
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-700 hover:text-blue-400">
                            Configuraciones
                        </a>
                    </li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="mt-6 p-3 w-full bg-red-600 text-white rounded-lg transition duration-300 ease-in-out hover:bg-red-700 hover:shadow-md">
                    Cerrar sesión
                </button>
            </aside>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Contenido principal */}
            <main className="flex-1 p-4 md:p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Dashboard gestión de empleados
                    </h1>
                    <h3 className="text-1xl md:text-1xl text-gray-400">Desafio SMC Latam</h3>
                </div>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Resumen</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h3 className="text-sm font-semibold text-gray-700">
                                Total Usuarios
                            </h3>
                            <p className="text-lg font-bold text-gray-900">{users.length}</p>
                        </div>
                        {Object.entries(departmentCounts).map(([dept, count]) => (
                            <div
                                key={dept}
                                className="bg-white p-4 rounded-lg shadow-md text-center">
                                <h3 className="text-sm font-semibold text-gray-700">{dept}</h3>
                                <p className="text-lg font-bold text-gray-900">{count}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Añadir Usuario</h2>
                    <form
                        onSubmit={handleAddUser}
                        className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border p-2 rounded-lg w-full"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border p-2 rounded-lg w-full"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Departamento"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="border p-2 rounded-lg w-full"
                                required
                            />
                        </div>
                        <button
                            type="submit" className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            Añadir Usuario
                        </button>
                    </form>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Listado</h2>
                    <div className="bg-white rounded-lg shadow-md overflow-x-auto">
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
                                    users.map((user) => (
                                        <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-200">
                                            <td className="p-3 text-gray-800">{user.name}</td>
                                            <td className="p-3 text-gray-800">{user.email}</td>
                                            <td className="p-3 text-gray-800">{user.department}</td>
                                            <td className="p-3">
                                                <button
                                                    onClick={() => openModal(user)}
                                                    className="bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 transition duration-200"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="ml-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-3 text-center text-gray-700">
                                            No hay usuarios disponibles
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Editar Usuario
                        </h2>
                        <form onSubmit={handleEditUser}>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Departamento"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;