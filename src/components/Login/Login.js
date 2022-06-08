import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate} from 'react-router-dom';

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // User Login info
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const { data } = res;
        setUsers(data);
      })
  }, []);

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = users.find((user) => user.email === uname.value);

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
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;
