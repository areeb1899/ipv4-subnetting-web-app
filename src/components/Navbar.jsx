import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-flex">
        <h1 className="logo">Subnet Practice IPv4</h1>

        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>


        <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/binary-representation" onClick={closeMenu}>Binary Notes</Link>
          <Link to="/flsm-vlsm" onClick={closeMenu}>FLSM vs VLSM</Link>
          <Link to="/ip-details" onClick={closeMenu}>Detect IP</Link>
          <Link to="/ip-lookup" onClick={closeMenu}>IP Lookup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
