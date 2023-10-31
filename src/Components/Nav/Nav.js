import React from 'react';
import './navStyle.css'; // Create a CSS file for styling

function Nav() {
  return (
    <header className="navigation-header">
      <div className="logo">
        {/* <img src="your-logo.png" alt="Logo" /> */}
      </div>
      <nav className="nav-options">
        <a href="/">View Data</a>
        <a href="/add-floor-plan">Add Data</a>
      </nav>
    </header>
  );
}

export default Nav;