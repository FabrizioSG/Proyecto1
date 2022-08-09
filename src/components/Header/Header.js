import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'
import jwt_decode from "jwt-decode";

const Header = () => {
    
  const navigate = useNavigate();
  
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    
  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <p className="navbar-brand">Welcome {decoded.user.name}</p>
        <button type="button" className="btn btn-dark" onClick={() => navigate('home')}>Home</button>
        <button type="button" className="btn btn-outline-light" onClick={logOut}>Log out</button>            
      </div>
    </nav>
  );
};

export default Header;
