
import React from 'react';

import {Navigate} from 'react-router-dom'


const useAuth=()=>{
  const user=localStorage.getItem('userId')
  if(user){
    return true
  } else {
    return false
  }
}

const  ProtectedRoutes=({children}) =>{

  const auth=useAuth()

  return auth ? children : <Navigate to="/" />;
}

export default ProtectedRoutes;