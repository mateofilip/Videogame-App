import axios from 'axios';
export const FETCH_VIDEOGAMES = 'FETCH_VIDEOGAMES';
export const FETCH_GENRES = 'FETCH_GENRES';
export const FETCH_BY_NAME = 'FETCH_BY_NAME';
export const SORT = 'SORT';
export const FILTER_BY_CREATION = 'FILTER_BY_CREATION';
export const SORT_BY_NAME = 'ORDER_BY_NAME';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';

export function fetchVideogames() {
  return async function (dispatch) {
    let jsonVideogames = await axios.get('http://localhost:3001/videogames');

    return dispatch({
      type: FETCH_VIDEOGAMES,
      payload: jsonVideogames.data,
    });
  };
}

export function fetchGenres() {
  return async function (dispatch) {
    let jsonGenres = await axios.get('http://localhost:3001/genres');

    return dispatch({
      type: FETCH_GENRES,
      payload: jsonGenres.data,
    });
  };
}

export function fetchByName(name) {
  return async function (dispatch) {
    try {
      let jsonNames = await axios.get(
        'http://localhost:3001/videogames?name=' + name
      );

      return dispatch({
        type: FETCH_BY_NAME,
        payload: jsonNames.data,
      });
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  };
}

export function createVideogame(payload) {
  return async function (dispatch) {
    const videogame = await axios.post(
      'http://localhost:3001/videogame/',
      payload
    );

    return dispatch({
      type: CREATE_VIDEOGAME,
      payload: videogame,
    });
  };
}

export function filterVideogamesByCreation(payload) {
  return {
    type: FILTER_BY_CREATION,
    payload,
  };
}

export function filterVideogamesByGenre(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}

export function sortByName(payload) {
  return {
    type: SORT_BY_NAME,
    payload,
  };
}

export function sortByRating(payload) {
  return {
    type: SORT_BY_RATING,
    payload,
  };
}
