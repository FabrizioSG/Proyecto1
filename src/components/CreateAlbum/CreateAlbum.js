import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAlbum() {

  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    let { vName, vDescription } = document.forms[0];
    const name = vName.value;
    const description = vDescription.value;

    try{
      axios
      .post('http://localhost:3010/api/albums', {
        name,
        description
      }, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .catch(function (error) {
        alert(error.response.data.message);
      })
      .then((response) => {
        if (response.data.message === 'Created') {
          alert('Album Created')
          navigate('/home');
        }
      });
    } catch(err) {
      alert(err);
    }
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="invalid-feedback">{ errorMessages.message }</div>
    );

  // JSX code for create album form
  const renderForm = (
    <form onSubmit={handleSubmit} className="needs-validation" novalidate>
      <div className="form-floating has-validation">
        <input type="text" className="form-control" id="floatingInputName" name="vName" placeholder="Name" required />
        <label for="floatingInputName">Name</label>
        {renderErrorMessage("vName")}
      </div>
      <div className="form-floating has-validation">
        <input type="text" className="form-control" id="floatingInputDescription" name="vDescription" placeholder="Description" required />
        <label for="floatingInputDescription">Description</label>
        {renderErrorMessage("vDescription")}
      </div>
      <div className='d-flex justify-content-between'>
        <button className="btn btn-lg btn-success mt-2" type="submit">Save</button>
        <button className="btn btn-lg btn-danger mt-2" onClick={() => navigate('/home')}>Cancel</button>
      </div>
    </form>
  );

  return (
    <div className="text-center">
      <div className="form-signin">
        <h1 className="title h3 mb-4 fw-normal">Create Album</h1>
        {renderForm}
      </div>
    </div>
  );
}

export default CreateAlbum;
