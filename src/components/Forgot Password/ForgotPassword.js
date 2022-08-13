import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPassword.css';

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname} = document.forms[0];
    const email = uname.value;

    try{
      axios
      .post("http://localhost:3010/api/users/resetPassword", {
        email
      })
      .catch(function (error) {
        alert(error.response.data.data)
      })
      .then((response) => {
        if (response.data.message === "OK") {
          alert("Reset password email sent to: " + email);
          navigate('/');
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
        <input type="text" className="form-control" id="floatingInput" name="uname" placeholder="Email" required />
        <label for="floatingInput">Email</label>
        {renderErrorMessage("uname")}
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">Reset Password</button>
      <p></p>
      <button  className="w-100 btn btn-lg btn-primary" onClick={() => navigate('/register')}>Register</button>

    </form>
  );

  return (
    <div className="text-center">
      <div className="form-signin">
        <h1 className="title h3 mb-4 fw-normal">Reset password</h1>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;
