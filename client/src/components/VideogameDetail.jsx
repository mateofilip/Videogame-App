import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export default function VideogameDetail() {
  const [videogame, setVideogame] = useState(null);
  let { idVideogame } = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:3001/videogame/' + idVideogame)
      .then((response) => {
        setVideogame(response.data);
      });

    return () => {
      setVideogame(null);
    };
  }, []);

  return (
    <div>
      {videogame ? (
        <>
          <h3>{videogame.name}</h3>
          <h4>Release Date: {videogame.releaseDate}</h4>
          <h4>Rating: {videogame.rating}</h4>
          <h4>Platforms: {videogame.platforms}</h4>
          <img src={videogame.image} alt="imagen" />
          <h5>{videogame.genres}</h5>
          <p>{videogame.description}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
