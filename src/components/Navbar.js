// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import './styling/Navbar.css';

const Navbar = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    // Add more logout working later
    setIsLoggedIn(false);
  };
  return (
    <nav className="navbar">
      <NavLink exact to="/" activeClassName="active-link">Home</NavLink>
      <NavLink to="/wardrobe" activeClassName="active-link">Wardrobe</NavLink>
      <NavLink to="/shopping" activeClassName="active-link">Shopping</NavLink>
      <NavLink to="/outfits" activeClassName="active-link">Outfit Suggestions</NavLink>
      {/* <NavLink to="/weather" activeClassName="active-link">Weather</NavLink> */}
      <NavLink to="/profile" activeClassName="active-link">Profile</NavLink>
      <NavLink to="/" onClick={handleLogout} activeClassName="active-link">Logout</NavLink>
      </nav>
  );
};

export default Navbar;
