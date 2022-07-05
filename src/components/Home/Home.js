import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./Home.css";

function Home() {

  const [name, setName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/albums").then((res) => {
      const { data } = res;

      const userAlbums = data.filter(album => album.userId.toString() === localStorage.getItem('userId'));
      setAlbums(userAlbums);
      setFilteredAlbums(userAlbums);

    });
  },[]);
  
  const filter = (e) => {

    const keyword = e.target.value;
    if(keyword===''){
        setAlbums(albums)
    }else if (keyword !== '') {
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
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter album by title"
      />

      <div className="user-list">
        {filteredAlbums && filteredAlbums.length > 0 ? (
          filteredAlbums.map((album) => (
            <li key={album.id} className="album">
              <Link to={`/albums/${album.id}`}>{album.title}</Link>
            </li>
          ))
        ) : (
          <h1>No results found!</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
