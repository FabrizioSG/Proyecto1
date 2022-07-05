import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Header.css"

const Header = () => {
    
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <p className="navbar-brand">Welcome {localStorage.getItem('name')}</p>
        <button type="button" className="btn btn-dark" onClick={() => navigate('home')}>Home</button>
        <button type="button" className="btn btn-outline-light" onClick={logOut}>Log out</button>            
      </div>
    </nav>
  );
};

export default Header;
