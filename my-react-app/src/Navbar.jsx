import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          DoIt
        </Link>

        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {token ? (
            <>
              <Link to="/dashboard" className="navbar-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/calendar" className="navbar-link" onClick={() => setMenuOpen(false)}>Calendar</Link>
              <button className="navbar-logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="navbar-signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;