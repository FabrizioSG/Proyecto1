import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.js';
import NotFound from './components/404/404Page.js'
import Home from './components/Home/Home.js';
import Header from './components/Header/Header.js'
import Album from './components/Album/Album.js'
import ProtectedRoutes from './components/Protected/protectedRoutes.js';
//import Photo from './components/Photo/Photo.js'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      
      {window.location.pathname !== '/' ? <Header /> : null}

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={ <ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route exact path="/albums/:albumId" element={<ProtectedRoutes><Album /></ProtectedRoutes>} />
        {//<Route exact path="/albums/:albumId/photos/:photoId" element={<Photo />} />
        }
        <Route exact path="*" element={<NotFound />} />

      </Routes>

    </div>

  );
}

export default App;
