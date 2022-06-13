import React from 'react';
import './404Page.css';
import error from '../../images/error-404.png';
import { Link } from 'react-router-dom';


const NotFound = () => (
  <div class="pantallaError center">
    <div class="col s12 m12 l12" style={{ textAlign: 'center' }}>
        <img src={error} alt="logo" style={{ height: "30%", width: "30%" }} />
        <h5>Oops, this page does not exist!</h5>
        <br></br>
      <div class="row"></div>
      {<Link to="/home">
          <button class="btn waves-effect waves-light" type="submit" name="action" style={{ backgroundColor: '#f74615' }}>Home
          </button>
        </Link>
        }
    </div>
  </div>
);

export default NotFound;