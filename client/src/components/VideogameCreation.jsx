import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import { createVideogame, fetchGenres } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../Sass/Styles/VideogameCreation.scss';

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

    if (!videogame.name) {
      alert('A name is required!');
      return;
    }

    if (!videogame.description) {
      alert('A description is required!');
      return;
    }

    if (!videogame.platforms || videogame.platforms[0] === '') {
      alert('A platform is required!');
      return;
    }

    if (!videogame.genres || videogame.genres[0] === '') {
      alert('A genre is required!');
      return;
    }

    if (!videogame.rating) videogame.rating = 0;

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
    <div className="VideogameCreation">
      <form className="creationForm">
        <div className="inputFields">
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(event) => changeHandler(event)}
            placeholder="Name*"
            className="input"
          />

          <input
            type="string"
            value={input.releaseDate}
            name="releaseDate"
            onChange={(event) => changeHandler(event)}
            placeholder="Release Date"
            className="input"
          />

          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={(event) => changeHandler(event)}
            placeholder="Rating"
            className="input"
          />

          <select
            name="platformOne"
            onChange={(event) => platformHandler(event)}
          >
            <option>Select a Platform*</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Other">Other</option>
          </select>

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

          <select name="genreOne" onChange={(event) => genreHandler(event)}>
            <option>Select a Genre*</option>
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>

          <select name="genreTwo" onChange={(event) => genreHandler(event)}>
            <option value="">Select Genres</option>
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
        </div>

        <div className="descriptionContainer">
          <textarea
            type="text"
            value={input.description}
            name="description"
            onChange={(event) => changeHandler(event)}
            placeholder="Description*"
          />
        </div>
      </form>

      <form className="buttonContainer" onSubmit={submitHandler}>
        <Link to="/homepage">
          <button>
            <BsXCircle /> Get back!
          </button>
        </Link>
        <button type="submit">
          <BsCheckCircle /> Create Videogame
        </button>
      </form>
    </div>
  );
}
