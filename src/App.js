import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login.js';
import NotFound from './components/404/404Page.js';
import Home from './components/Home/Home.js';
import Header from './components/Header/Header.js';
import Album from './components/Album/Album.js';
import ProtectedRoutes from './components/Protected/protectedRoutes.js';
import Register from './components/Register/Register.js';
import ForgotPassword from './components/Forgot Password/ForgotPassword.js';

function App() {
  return (
    <>
      {/* Forma más sencilla de no mostrar header en pantalla de login */}
      { window.location.pathname !== '/' ? <Header /> : null }

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element = {<Register/>}/>
        <Route exact path="/forgotPassword" element = {<ForgotPassword/>}/>
        <Route exact path="/home" element={ <ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route exact path="/albums/:albumId" element={<ProtectedRoutes><Album /></ProtectedRoutes>} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  ); 
}

export default App;
