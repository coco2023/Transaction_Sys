import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Assuming you have a separate CSS file for navigation

const Navigation = () => {
  return (
    <div className="nav-container">
      <div className="nav-logo">
        UmiUni
      </div>

      <div className="nav-menu">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/cancel">Cancel</Link>
      </div>
    </div>
  );
};

export default Navigation;
