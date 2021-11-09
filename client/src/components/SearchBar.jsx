import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchByName } from '../store/actions';

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
    <div>
      <form onSubmit={(element) => submitHandler(element)}>
        <input
          type="text"
          onChange={inputChangeHandler}
          placeholder="Search for a videogame!"
        />
        <input type="submit" value="🔍" />
      </form>
    </div>
  );
}
