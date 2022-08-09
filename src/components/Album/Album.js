import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Album.css'
import Modal from '../Modal/Modal';
import Photo from '../Photo/Photo';

function Album() {

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

  return (
    <div className="container">
      <input
        type="search"
        className="form-control me-2"
        value={name}
        onChange={filter}
        placeholder="Search photos"
      />

      {showModal.show &&
        <Modal closeModal={closeModalHandler}>
          <Photo title={showModal.title} url={showModal.url} />
        </Modal>
      }

      <div className="row">
        {filteredPhotos && filteredPhotos.length ? (
          filteredPhotos.map((photo) => (
            <div key={photo.id} className='col'>
              <div className="card card-photo shadow-sm">
                <img className="photo bd-placeholder-img card-img-top" src={ photo.thumbnailUrl } alt={ photo.title } onClick={() => {showModalHandler(photo.title, photo.url)}} />
                <p className="card-text card-text-photo">{photo.title}</p>
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
