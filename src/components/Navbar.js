import React, { useState } from 'react';
import './Navbar.css';


const Navbar = () => {
  // State to manage the open/close state of the menu
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo section */}
      <div className="navbar-logo">
        <a href="https://pixel6.co/" target="_blank" rel="noopener noreferrer">
          <img src="https://pixel6.co/wp-content/themes/new-pixel6-wp/assets/images/Pixel6.png" alt="Company Logo" />
        </a>
      </div>

    
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        {/* Hamburger icon for toggles the menu */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        {/* Navigation links */}
        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
