import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createVideogame, fetchGenres } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

let selectGenres = {
  genreOne: '',
  genreTwo: '',
};

let selectPlatforms = {
  platformOne: '',
  platformTwo: '',
};

export default function VideogameCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: '',
    description: '',
    releaseDate: '',
    rating: '',
    genres: [],
    platforms: [],
  });

  function changeHandler(event) {
    setInput(() => {
      const state = {
        ...input,
        [event.target.name]: event.target.value,
      };
      return state;
    });
  }

  function platformHandler(event) {
    return (selectPlatforms[event.target.name] = event.target.value);
  }

  function genreHandler(event) {
    return (selectGenres[event.target.name] = event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let videogame = input;
    videogame.genres = Object.values(selectGenres);
    videogame.platforms = Object.values(selectPlatforms);
    dispatch(createVideogame(videogame));
    alert('Videogame created!');
    setInput({
      name: '',
      description: '',
      releaseDate: '',
      rating: '',
      genres: [],
      platforms: [],
    });

    history.push('/homepage');
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  return (
    <div>
      <Link to="/homepage">
        <button>Get back!</button>
      </Link>

      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div>
          <label>Release Date:</label>
          <input
            type="string"
            value={input.releaseDate}
            name="releaseDate"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div>
          <label>Platform:</label>
          <select
            name="platformOne"
            onChange={(event) => platformHandler(event)}
          >
            <option>Select a Platform</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Platform:</label>
          <select
            name="platformTwo"
            onChange={(event) => platformHandler(event)}
          >
            <option>Select a Platform</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Genre:</label>
          <select name="genreOne" onChange={(event) => genreHandler(event)}>
            <option>Select a Genre</option>
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Genre:</label>
          <select name="genreTwo" onChange={(event) => genreHandler(event)}>
            <option value="">Select Genres</option>
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
          <ul>
            <li>{input.genres.map((genre) => genre + ', ')}</li>
          </ul>
        </div>
      </form>

      <form onSubmit={submitHandler}>
        <button type="submit">Create Videogame</button>
      </form>
    </div>
  );
}
