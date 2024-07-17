import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Stil dosyasını ekleyin
import { AuthContext } from '../context/AuthContext'; // AuthContext'i import edin

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // AuthContext'ten user ve logout fonksiyonunu alın

  const handleLogout = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      logout();
      window.location.href = "/login";
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {user ? (
          <>
            {user.role === "user" && (
              <li className="navbar-item">
                <Link to="/user" className="navbar-link">User</Link>
              </li>
            )}
            {user.role === "admin" && (
              <li className="navbar-item">
                <Link to="/admin" className="navbar-link">Admin</Link>
              </li>
            )}
            {user.role === "carrier" && (
              <li className="navbar-item">
                <Link to="/carrier" className="navbar-link">Carrier</Link>
              </li>
            )}
            <button onClick={handleLogout} className="navbar-link">
              Çıkış
            </button>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">Register</Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
