import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchByName } from '../store/actions';
import '../Sass/Styles/SearchBar.scss';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function inputChangeHandler(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(fetchByName(name));
  }

  return (
    <div className="searchBar">
      <form onSubmit={(element) => submitHandler(element)}>
        <input
          type="text"
          onChange={inputChangeHandler}
          onSubmit={submitHandler}
          placeholder="🔍 Search for a videogame!"
        />
      </form>
    </div>
  );
}
