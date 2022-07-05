import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // User Login info
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const { data } = res;
        setUsers(data);
      })
  }, []);

  const errors = {
    uname: "Invalid username",
    pass: "Invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = users.find((user) => user.email === uname.value || user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.address.zipcode !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('name', userData.name);
        localStorage.setItem('email', userData.email);
        navigate('home');
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="invalid-feedback">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <form onSubmit={handleSubmit} className="needs-validation " novalidate>
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
