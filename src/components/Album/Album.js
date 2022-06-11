import {useParams} from "react-router-dom";
import React, { useState, useEffect} from "react";
import axios from "axios";
import "./Album.css"

const Album = () => {

    const {albumId} = useParams();
    const [photos, setPhotos] = useState([]);


  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/photos").then((res) => {
      const { data } = res;

      const albumPhotos = data.filter(photo => photo.albumId.toString() === albumId);
      setPhotos(albumPhotos);

    });
  },[albumId]);

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
