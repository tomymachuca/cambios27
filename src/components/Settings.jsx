import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Menu/Navbar'; 
import ResetPasswordModal from './ResetPasswordModal'; // Importa el modal desde su archivo

const AccountSettings = () => {
  const [username, setUsername] = useState('Tomas machuca'); 
  const [email, setEmail] = useState('tomasmachuca@gmail.com'); 
  const [isEditingName, setIsEditingName] = useState(false); 
  const [isEditingEmail, setIsEditingEmail] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleGoToMenu = () => {
    navigate('/menu'); 
  };

  const handleSaveChanges = () => {
    if (username.trim() === '') {
      setError('El nombre de usuario no puede estar vacío.');
    } else {
      console.log('Cambios guardados:', { username, email });
      setIsEditingName(false);
      setIsEditingEmail(false);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex flex-grow items-center justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Configuraciones
          </h2>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Nombre de Usuario:</label>
              {isEditingName ? (
                <button
                  onClick={handleSaveChanges}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Editar
                </button>
              )}
            </div>
            {isEditingName ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <p className="mt-2 text-sm text-gray-800">{username}</p>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Correo Electrónico:</label>
              {isEditingEmail ? (
                <button
                  onClick={handleSaveChanges}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Editar
                </button>
              )}
            </div>
            {isEditingEmail ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <p className="mt-2 text-sm text-gray-800">{email}</p>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)} // Abrir modal
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mb-4"
          >
            Restablecer Contraseña
          </button>

          <button
            onClick={handleGoToMenu}
            className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Volver al Menú
          </button>
        </div>
      </main>

      {isModalOpen && <ResetPasswordModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AccountSettings;
