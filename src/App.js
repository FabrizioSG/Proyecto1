import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.js';
import NotFound from './components/404/404Page.js'
import Home from './components/Home/Home.js';
import Header from './components/Header/Header.js'
import Album from './components/Album/Album.js'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
    <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/albums/:id" element={<Album />} />

        <Route element={<NotFound />} />
      </Routes>

    </div>
   
  ); 
}

export default App;
