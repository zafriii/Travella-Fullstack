import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import './navbar.css';
import { FaRegPaperPlane } from "react-icons/fa";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedin, LogoutUser } = useAuth(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    LogoutUser();
    toggleMenu();
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        {/* <h1>Travella <FaRegPaperPlane className='logo-icon'/></h1> */}
        <h1> <NavLink to="/">Travella <FaRegPaperPlane className='logo-icon'/></NavLink>   </h1>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={toggleMenu}>
          Home
        </NavLink>
        <NavLink to="/contact" onClick={toggleMenu}>
          Contact
        </NavLink>
        <NavLink to="/plans" onClick={toggleMenu}>
          Plans
        </NavLink>
        <NavLink to="/lists" onClick={toggleMenu}>
          Lists
        </NavLink>
        <NavLink to="/gallery" onClick={toggleMenu}>
          Gallery
        </NavLink>
        <NavLink to="/blogs" onClick={toggleMenu}>
          Blogs
        </NavLink>

        
        {isLoggedin ? (
          <NavLink className='log-btns' to="/logout" onClick={handleLogout}>
            Logout
          </NavLink>
        ) : (
          <NavLink className='log-btns' to="/login" onClick={toggleMenu}>
            Login
          </NavLink>
        )}
      </div>

      
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
        <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
        <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
      </div>
    </div>
  );
}

export default Navbar;
