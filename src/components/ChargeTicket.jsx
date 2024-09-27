import React, { useState } from "react";
import Navbar from './Menu/Navbar'; // Importa el Navbar que ya tienes

const TicketForm = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    monto: '',
    casa: '',
    descripcion: '', // Para manejar la descripción del gasto
    foto: null, // Para manejar la foto que se suba
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar la subida de archivos (fotos)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      foto: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí puedes manejar la subida de datos y foto
    console.log('Datos del ticket:', formData);

    // Si quieres mostrar una vista previa de la imagen:
    if (formData.foto) {
      const fotoURL = URL.createObjectURL(formData.foto);
      console.log('Vista previa de la imagen:', fotoURL);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Form Section */}
      <main className="flex flex-grow items-center justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Ingrese su Ticket</h2>
          <form onSubmit={handleSubmit}>
            {/* Fecha */}
            <div className="mb-4">
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">Fecha:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Monto Total */}
            <div className="mb-4">
              <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-2">Monto Total:</label>
              <input
                type="number"
                id="monto"
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Casa a tu nombre */}
            <div className="mb-4">
              <label htmlFor="grupo" className="block text-sm font-medium text-gray-700 mb-2">Nombre del grupo:</label>
              <select
                id="grupo"
                name="grupo"
                value={formData.casa}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Seleccione una opción</option>
                <option value="grupo1">Grupo 1</option>
                <option value="grupo2">Grupo 2</option>
                <option value="grupo3">Grupo 3</option>
              </select>
            </div>

            {/* Descripción del gasto */}
            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">Descripción del gasto:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Describa el gasto..."
              ></textarea>
            </div>

            {/* Subir Foto del Ticket */}
            <div className="mb-6">
              <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-2">Subir foto del ticket:</label>
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TicketForm;
