import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    const email = uname.value;
    const password = pass.value;
    try{
      axios
      .post("http://localhost:3010/api/users/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.message === "OK") {
          const jwt = response.data.data.token;
          localStorage.setItem('token',jwt);
          navigate('home');
        }
        else{
          alert(response.data);
        }
      });
    }catch(err){
      alert(err);
    }
    
   
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="invalid-feedback">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <form onSubmit={handleSubmit} className="needs-validation" novalidate>
      <div className="form-floating has-validation">
        <input type="text" className="form-control" id="floatingInput" name="uname" placeholder="Email or username" required />
        <label for="floatingInput">Email or username</label>
        {renderErrorMessage("uname")}
      </div>
      <div className="form-floating has-validation">
        <input type="password" className="form-control" id="floatingPassword" name="pass" placeholder="Password" required />
        <label for="floatingPassword">Password</label>
        {renderErrorMessage("pass")}
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
    </form>
  );

  return (
    <div className="text-center">
      <div className="form-signin">
        <h1 className="title h3 mb-4 fw-normal">Galería</h1>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;
