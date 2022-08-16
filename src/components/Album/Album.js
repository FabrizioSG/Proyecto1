import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Album.css'
import Modal from '../Modal/Modal';
import Photo from '../Photo/Photo';

function Album() {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [name, setName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [showModal, setShowModal] = useState({
    title: '',
    url: '',
    show: false
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3010/api/photos/${albumId}`,{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then((res) => {
        const { data } = res;
        setPhotos(data.data);
        setFilteredPhotos(data.data);
    });
  }, [albumId]);
  
  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword === '') {
      setPhotos(photos);
    } else if (keyword !== '') {
      const results = photos.filter((photo) => {
        return photo.title.toLowerCase().includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFilteredPhotos(results);
      // If the text field is empty, show all users
    }
    setName(keyword);
  }

  const showModalHandler = (title, url) => {
    setShowModal({
      title: title,
      url: url,
      show: true
    });
  }

  const closeModalHandler = () => {
    setShowModal({
      title: '',
      url: '',
      show: false
    });
  };
  const handleDelete = (photoId) => {
    try{
      axios
      .delete(`http://localhost:3010/api/photos/${photoId}`, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .catch(function (error) {
        alert(error.response.data.message);
      })
      .then((response) => {
        if (response.data.message === 'OK') {
          alert('Photo Deleted');
          setPhotos(photos);
        }
      });
    } catch(err) {
      alert(err);
    }
  }

  return (
    <div className="container">
      
      <div className="d-flex justify-content-between">
        <input
          type="search"
          className="form-control me-2"
          value={name}
          onChange={filter}
          placeholder="Search photos"
        />
        <button type="button" className="btn btn-lg btn-primary" onClick={() => navigate(`/home/${albumId}/createPhoto`)}>New Photo</button>
      </div>

      {showModal.show &&
        <Modal closeModal={closeModalHandler}>
          <Photo title={showModal.title} url={showModal.url} />
        </Modal>
      }

      <div className="row">
        {filteredPhotos && filteredPhotos.length ? (
          filteredPhotos.map((photo) => (
            <div key={photo._id} className='col'>
              <div className="card card-photo shadow-sm">
                <img className="photo bd-placeholder-img card-img-top" src={ photo.URL } alt={ photo.name } onClick={() => {showModalHandler(photo.name, photo.URL)}} />
                <p className="card-text card-text-photo">{photo.name}</p>
                <div>
                <button type="button" className="btn btn-warning mt-2" onClick={() => navigate(`/home/${photo._id}/editPhoto`)}>Edit</button>
                <button type="button" className="btn btn-danger mt-2" onClick={() => handleDelete(photo._id)}>Delete</button>
              </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center">
            <h3><strong>No results found!</strong></h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Album;
