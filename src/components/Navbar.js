import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import './styling/Navbar.css';

const Navbar = ({ handleLogout }) => {

  return (
    <nav className="navbar">
      <NavLink exact to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
      <NavLink to="/wardrobe" className={({ isActive }) => (isActive ? 'active-link' : '')}>Wardrobe</NavLink>
      <NavLink to="/outfits" className={({ isActive }) => (isActive ? 'active-link' : '')}>Outfit Suggestions</NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active-link' : '')}>Profile</NavLink>
      <NavLink to="/" onClick={handleLogout} className={({ isActive }) => (isActive ? 'active-link' : 'logout-link')}>Logout</NavLink>
    </nav>
  );
};

export default Navbar;
