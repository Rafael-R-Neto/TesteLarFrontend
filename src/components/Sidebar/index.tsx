import React from 'react';
import { Link } from 'react-router-dom';
import { sidebarStyles } from './style';

const Sidebar: React.FC = () => {
  return (
    <div style={sidebarStyles.container}>
      <h3>Menu Lateral</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard" style={sidebarStyles.link}>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile" style={sidebarStyles.link}>
            Perfil
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/settings" style={sidebarStyles.link}>
            Configurações
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;