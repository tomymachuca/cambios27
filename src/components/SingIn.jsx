import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResetPasswordModal from './ResetPasswordModal'; // Importa el componente modal

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Para manejar mensajes de error
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla el estado del modal
  const navigate = useNavigate(); 

  // Lista de usuarios permitidos (hardcoded)
  const users = [
    { email: 'marcoriccitelli@gmail.com', password: 'Clave1234' },
    { email: 'tomasmachuca@gmail.com', password: 'Clave1234' },
    { email: 'francomagurno@gmail.com', password: 'Clave1234' }
  ];

  // Validación simple de email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return re.test(String(email).toLowerCase());
  };

  // Función de validación de credenciales
  const handleSignIn = (e) => {
    e.preventDefault();

    // Validar que el email tenga el formato correcto
    if (!validateEmail(email)) {
      setError('Por favor, ingrese un email válido.');
      return;
    }

    // Validar que la contraseña no esté vacía
    if (!password) {
      setError('Por favor, ingrese una contraseña.');
      return;
    }

    // Verificar si el usuario y la contraseña coinciden con los hardcodeados
    const userFound = users.find(user => user.email === email && user.password === password);

    if (!userFound) {
      setError('Email o contraseña incorrectos.');
      return;
    }

    // Si las credenciales son válidas, limpiar errores y redirigir al menú
    setError(''); // Limpiar errores si todo está bien
    navigate('/menu'); // Redirigir al menú
  };

  // Función para abrir el modal de restablecimiento de contraseña
  const handleForgotPassword = (e) => {
    e.preventDefault(); // Evita la recarga de página
    setIsModalOpen(true); // Abre el modal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 m-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
        </div>

        <form className="mt-6" onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-800 dark:text-gray-200">Mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* Mostrar error si hay alguno */}
          {error && (
            <div className="mt-2 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Enlace "¿Olvidaste tu contraseña?" */}
          <div className="mt-2">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-gray-600 dark:text-gray-200 hover:underline"
            >
              ¿Has olvidado tu contraseña?
            </button>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          Aún no tienes cuenta? <a href="/signup" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Créate una</a>
        </p>
      </div>

      {/* Modal de restablecimiento de contraseña */}
      {isModalOpen && <ResetPasswordModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default SignIn;
