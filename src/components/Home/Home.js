import React, { useState, useEffect} from "react";
import axios from "axios";
import "./Home.css";

function Home() {

  // User Login info
  
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/albums").then((res) => {
      const { data } = res;

      const userAlbums = data.filter(album => album.userId.toString() === localStorage.getItem('user'));
      setAlbums(userAlbums);
    });
  }, []);
  
  
  
  return (
    <div>
      
      {albums[0] ? (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>{album.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>)}
    </div>
  );
}

export default Home;
