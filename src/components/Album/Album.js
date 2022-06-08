import {useParams} from "react-router-dom";
import React, { useState, useEffect} from "react";
import axios from "axios";

const Album = () => {

    const {id} = useParams();
    const [photos, setPhotos] = useState([]);


  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
      const { data } = res;

      const albumPhotos = data.filter(photo => photo.albumId.toString() === id);
      setPhotos(albumPhotos);

    });
  },[id]);

    return (
        <div className="container">
      <input
        type="search"
        className="input"
        placeholder="Filter photos by title"
      />

      <div className="photo-list">
        {photos && photos.length > 0 ? (
          photos.map((photo) => (
            <li key={photo.id} className="album">
              <span className="user-id">{photo.title}</span>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
    );
};

export default Album;
