import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {

  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    let { vName, vLastName, vLastName2, vEmail, vPass1, vPass2  } = document.forms[0];
    const name = vName.value;
    const first_last_name = vLastName.value;
    const second_last_name = vLastName2.value;
    const email = vEmail.value;
    const password = vPass1.value;
    const pass2 = vPass2.value;
    const gender = "M";
    const birthday = new Date(12/12/12);
    if(password !== pass2){
      alert("Passwords do not match!")
    };

    try{
      axios
      .post("http://localhost:3010/api/users/signup", {
        name,
        first_last_name,
        second_last_name, 
        email, 
        password,
        gender,
        birthday
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === "Created") {
          alert("User Created")
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
        <input type="text" className="form-control" id="floatingInput" name="vName" placeholder="Name" required />
        <label for="floatingInput">Name</label>
        {renderErrorMessage("uname")}
      </div>
      <div className="form-floating has-validation">
        <input type="text" className="form-control" id="floatingInput1" name="vLastName" placeholder="First Last Name" required />
        <label for="floatingInput">First Last Name</label>
        {renderErrorMessage("uname")}
      </div>
      <div className="form-floating has-validation">
        <input type="text" className="form-control" id="floatingInput2" name="vLastName2" placeholder="Second Last Name" required />
        <label for="floatingInput">Second Last Name</label>
        {renderErrorMessage("uname")}
      </div>
      <div className="form-floating has-validation">
        <input type="text" className="form-control" id="floatingInput3" name="vEmail" placeholder="Email" required />
        <label for="floatingInput">Email</label>
        {renderErrorMessage("uname")}
      </div>
      <div className="form-floating has-validation">
        <input type="password" className="form-control" id="floatingPassword1" name="vPass1" placeholder="Password" required />
        <label for="floatingPassword">Password</label>
        {renderErrorMessage("pass")}
        
      </div>
      <div className="form-floating has-validation">
        <input type="password" className="form-control" id="floatingPassword2" name="vPass2" placeholder="Confirm Password" required />
        <label for="floatingPassword">Confirm Password</label>
        {renderErrorMessage("pass")}
        
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
      <button  className="w-100 btn btn-lg btn-primary mt-2" onClick={() => navigate('/')}>Back to Login</button>

    </form>
  );

  return (
    <div className="text-center">
      <div className="form-signin">
        <h1 className="title h3 mb-4 fw-normal">Register</h1>
        {renderForm}
      </div>
    </div>
  );
}

export default Register;