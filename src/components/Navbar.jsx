import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-flex">
        <h1 className="logo">Subnet Practice IPv4</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/binary-representation">Binary Notes</Link>
          <Link to="/flsm-vlsm">FLSM vs VLSM</Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
