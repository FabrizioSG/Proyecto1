import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.js';
import NotFound from './components/404/404Page.js'
import Home from './components/Home/Home.js';
import Header from './components/Header/Header.js'
import Album from './components/Album/Album.js'
import Photo from './components/Photo/Photo.js'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
    <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/albums/:albumId" element={<Album />} />
        <Route exact path="/albums/:albumId/photos/:photoId" element={<Photo />} />

        <Route element={<NotFound />} />
      </Routes>

    </div>
   
  ); 
}

export default App;
