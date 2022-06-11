import {useParams} from "react-router-dom";
import React, { useState, useEffect} from "react";
import axios from "axios";
import "./Album.css"

const Album = () => {

    const {albumId} = useParams();
    const [name, setName] = useState('');
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);


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

  return (
    <div className="container">
      <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter photos by title"
      />

      <div className="photo-list">
        {filteredPhotos && filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => (
            <div key={photo.id} className="photo-array">
              <img className="photo" src={ photo.thumbnailUrl } title={ photo.title } alt={ photo.title } />
              <p className="photo-id">{photo.title}</p>
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
