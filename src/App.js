import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandinPage from './Pages/LandinPage'; // Asegúrate de que el nombre del archivo esté bien
import SingIn from './Pages/SingIn'; // Asegúrate de que el nombre del archivo esté bien
import SignUp from './Pages/SignUp';
import Menu from './Pages/Menu';
import ChargeTicket from './Pages/ChargeTicket';
import CreateGroup from './components/CreateGroup';
import TeamMembers from './components/TeamMembers';
import UserProfileComponent from './components/UserProfileComponent';
import AddMembers from './components/AddMembers'; // Ruta correcta para el componente
import Historial from './components/Historial';
import Balance from './components/Balance';
import Settings from './Pages/settings';
import SettleBalanceComponent from './components/SettleBalanceComponent';
import Saldos from './components/Saldos';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<LandinPage />} />
        
        {/* Ruta para la página de inicio de sesión */}
        <Route path="/signin" element={<SingIn />} />
        
        {/* Ruta para la página de registro */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Ruta para la página del menú */}
        <Route path="/menu" element={<Menu />} />
        
        {/* Ruta para la página de cargar ticket */}
        <Route path="/charge-ticket" element={<ChargeTicket />} />
        
        {/* Ruta para crear un grupo */}
        <Route path="/create-group" element={<CreateGroup />} />

        {/* Ruta para ver los miembros del equipo */}
        <Route path="/team-members" element={<TeamMembers />} />

        {/* Ruta para el perfil de usuario */}
        <Route path="/user-profile" element={<UserProfileComponent />} />

        {/* Ruta para agregar miembros */}
        <Route path="/add-members" element={<AddMembers />} />
        {/* Ruta para agregar miembros */}
        <Route path="/historial" element={<Historial />} />
        {/* Ruta para agregar miembros */}
        <Route path="/balance" element={<Balance />} />
        {/* Ruta para agregar miembros */}
        <Route path="/configuraciones" element={<Settings />} />
        {/* Ruta para agregar miembros */}
        <Route path="/cerrar-balance" element={< SettleBalanceComponent/>} />
        {/* Ruta para agregar miembros */}
        <Route path="/saldo" element={< Saldos/>} />
      </Routes>
    </Router>
  );
}

export default App;
