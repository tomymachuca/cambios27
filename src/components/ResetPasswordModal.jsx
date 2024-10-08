import React, { useState } from 'react';

const ResetPasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(''); // Para manejar los errores

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden. Inténtalo de nuevo.");
      return;
    }

    // Procesar el restablecimiento de la contraseña aquí
    console.log('Contraseña restablecida:', formData.newPassword);
    setError(''); // Limpiar error si las contraseñas coinciden
    onClose(); // Cierra el modal después de restablecer
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Restablecer Contraseña</h2>
        
        {/* Formulario de restablecimiento de contraseña */}
        <form onSubmit={handleSubmit}>
          {/* Nueva Contraseña */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Confirmar Nueva Contraseña */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Mostrar mensaje de error si las contraseñas no coinciden */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Botón de restablecer */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
          >
            Restablecer Contraseña
          </button>

          {/* Botón para cerrar el modal */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
