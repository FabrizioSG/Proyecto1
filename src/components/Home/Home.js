import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {

  const [name, setName] = useState('');
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3010/api/albums',{
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then((res) => {
        const { data } = res;
        setAlbums(data.data);
        setFilteredAlbums(data.data);
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

  const handleDelete = (albumId) => {
    try{
      axios
      .delete(`http://localhost:3010/api/albums/${albumId}`, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .catch(function (error) {
        alert(error.response.data.message);
      })
      .then((response) => {
        if (response.data.message === 'OK') {
          alert('Album Deleted');
          setAlbums(albums);
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
          placeholder="Search albums"
        />
        <button type="button" className="btn btn-lg btn-primary" onClick={() => navigate('/home/createAlbum')}>New Album</button>
      </div>

    
      <div className="album-list">
        {filteredAlbums && filteredAlbums.length ? (
          filteredAlbums.map((album) => (
            <div key={album._id} className="card shadow-sm d-flex justify-content-between">
              <Link className="card-text" to={`/albums/${album._id}`}>{album.name}</Link>
              <div>
                <button type="button" className="btn btn-warning mt-2" onClick={() => navigate(`/home/${album._id}/editAlbum`)}>Edit</button>
                <button type="button" className="btn btn-danger mt-2" onClick={() => handleDelete(album._id)}>Delete</button>
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

export default Home;
