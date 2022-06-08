import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.js';
import NotFound from './components/404/404Page.js'
import Home from './components/Home/Home.js';

function App() {
  return (
    <div>
            {/*<Routes>
        <HeaderManagement />
  </Routes>*/}

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />

        <Route element={<NotFound />} />


      </Routes>

    </div>
   
  ); 
}
/*function HeaderManagement() {
  //if (localStorage.getItem('userType') != 1) {
  if(true){
    return <div />;
  } else {
    return <NotFound />;
  }
}*/


export default App;
