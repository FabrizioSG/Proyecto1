import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditPhoto() {
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const { photoId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3010/api/photos/photo/${photoId}`,{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then((res) => {
        console.log(res);
        const { data } = res;
        setName(data.data.name);
        setDescription(data.data.description);
        setUrl(data.data.URL);
    });
  },[photoId]);

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    let { vName, vDescription, vURL } = document.forms[0];
    const name = vName.value;
    const description = vDescription.value;
    const URL = vURL.value;

    try{
      axios
      .put(`http://localhost:3010/api/photos/${photoId}`, {
        name,
        description,
        URL
      }, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .catch(function (error) {
        alert(error.response.data.message);
      })
      .then((response) => {
        if (response.data.message === 'OK') {
          alert('Photo Updated')
          navigate(`/albums/${response.data.data.album}`);
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
        <input type="text" className="form-control" id="floatingInputName" name="vName" placeholder="Name" defaultValue={name} required />
        <label for="floatingInputName">Name</label>
        {renderErrorMessage("vName")}
      </div>
      <div className="form-floating has-validation">
        <input type="text" className="form-control" id="floatingInputDescription" name="vDescription" placeholder="Description" defaultValue ={description} required />
        <label for="floatingInputDescription">Description</label>
        {renderErrorMessage("vDescription")}
      </div>
      <div className="form-floating has-validation">
        <input type="text" className="form-control" id="floatingInputDescription" name="vURL" placeholder="URL" defaultValue={url} required />
        <label for="floatingInputDescription">URL</label>
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
        <h1 className="title h3 mb-4 fw-normal">Edit Photo</h1>
        {renderForm}
      </div>
    </div>
  );
}

export default EditPhoto;
