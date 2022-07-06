import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {

  const [name, setName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/albums')
      .then((res) => {
        const { data } = res;
        const userAlbums = data.filter(album => album.userId.toString() === localStorage.getItem('userId'));
        setAlbums(userAlbums);
        setFilteredAlbums(userAlbums);
    });
  },[]);
  
  const filter = (e) => {
    const keyword = e.target.value;
    
    if (keyword === '') {
        setAlbums(albums);
    } else if (keyword !== '') {
      const results = albums.filter((album) => {
        return album.title.toLowerCase().includes(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFilteredAlbums(results);
      // If the text field is empty, show all users
    }
    setName(keyword);
  }
  
  return (
    <div className="container">
      <input
        type="search"
        className="form-control me-2"
        value={name}
        onChange={filter}
        placeholder="Search albums"
      />

      <div className="album-list">
        {filteredAlbums && filteredAlbums.length ? (
          filteredAlbums.map((album) => (
            <div key={album.id} className="card shadow-sm">
              <Link className="card-text" to={`/albums/${album.id}`}>{album.title}</Link>
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

export default Home;
