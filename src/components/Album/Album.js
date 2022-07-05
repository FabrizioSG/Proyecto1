import {useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Album.css"
import Modal from "../Modal/Modal";
import Photo from "../Photo/Photo";

function Album() {

    const {albumId} = useParams();
    const [name, setName] = useState('');
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [showModal, setShowModal] = useState({
      title: '',
      url: '',
      show: false
    });
    //const [photo, setPhoto] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
      const { data } = res;

      const userPhotos = data.filter(photo => photo.albumId.toString() === albumId);
      setPhotos(userPhotos);
      setFilteredPhotos(userPhotos);

    });
  },[albumId]);

  const filter = (e) => {

    const keyword = e.target.value;
    if(keyword===''){
      setPhotos(photos)
    }else if (keyword !== '') {
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
    //getPhoto(id);
  }

  const closeModalHandler = () => {
    setShowModal({
      title: '',
      url: '',
      show: false
    });
    //setPhoto(null);
  };

  /* const getPhoto = (id) => {
    axios.get(`https://jsonplaceholder.typicode.com/photos?id=${id}`).then(response => {
      setPhoto(response.data);
    });
  } */

  return (
    <div className="container">
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter photos by title"
      />
      {showModal.show &&
        <Modal closeModal={closeModalHandler} modalTitle={showModal.title}>
          <Photo title={showModal.title} url={showModal.url} />
        </Modal>
      }
      <div className="photo-list">
        {filteredPhotos && filteredPhotos.length ? (
          filteredPhotos.map((p) => (
            <div key={p.id} className="photo-array">
              <img className="photo" src={ p.thumbnailUrl } alt={ p.title } onClick={() => {showModalHandler(p.title, p.url)}} />
              <p className="photo-id">{p.title}</p>
            </div>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  );
};

export default Album;
