import {
  CREATE_VIDEOGAME,
  FETCH_BY_ID,
  FETCH_BY_NAME,
  FETCH_GENRES,
  FETCH_VIDEOGAMES,
  FILTER_BY_CREATION,
  FILTER_BY_GENRE,
  SORT_BY_NAME,
  SORT_BY_RATING,
  CLEAR_DETAIL,
  SORT_BY_RATING_4,
} from '../actions';

const initialState = {
  videogames: [],
  filteredVideogames: [],
  genres: [],
  videogameDetail: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        filteredVideogames: action.payload,
      };

    case FETCH_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FETCH_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };

    case FETCH_BY_ID:
      return {
        ...state,
        videogameDetail: action.payload,
      };

    case CREATE_VIDEOGAME:
      return {
        ...state,
        filteredVideogames: [],
      };

    case FILTER_BY_CREATION:
      const filteredVideogamesByCreation = state.filteredVideogames;
      const creationFiltered =
        action.payload === 'All'
          ? filteredVideogamesByCreation
          : action.payload === 'Created'
          ? filteredVideogamesByCreation.filter(
              (videogame) => videogame.id.toString().length > 15
            )
          : filteredVideogamesByCreation.filter(
              (videogame) => videogame.id.toString().length < 15
            );
      return {
        ...state,
        videogames: creationFiltered,
      };

    case FILTER_BY_GENRE:
      const filteredVideogamesByGenre = state.filteredVideogames;
      const genreFiltered =
        action.payload === 'All'
          ? filteredVideogamesByGenre
          : filteredVideogamesByGenre.filter((videogame) =>
              videogame.genres.includes(action.payload)
            );

      return {
        ...state,
        videogames: genreFiltered,
      };

    case SORT_BY_NAME:
      let sortedArray =
        action.payload === 'ASCENDING'
          ? state.videogames.sort((elementA, elementB) => {
              if (elementA.name > elementB.name) return 1;
              if (elementA.name < elementB.name) return -1;
              else return 0;
            })
          : state.videogames.sort((elementA, elementB) => {
              if (elementA.name > elementB.name) return -1;
              if (elementA.name < elementB.name) return 1;
              else return 0;
            });

      return {
        ...state,
        videogames: sortedArray,
      };

    case SORT_BY_RATING_4:
      const filteredVideogamesByRating4 = state.filteredVideogames;
      const ratingFiltered = filteredVideogamesByRating4.filter((videogame) => {
        return videogame.rating > 4;
      });

      return {
        ...state,
        videogames: ratingFiltered,
      };

    case SORT_BY_RATING:
      let sortedArrayy =
        action.payload === 'ASCENDING'
          ? state.videogames.sort((elementA, elementB) => {
              if (elementA.rating > elementB.rating) return 1;
              if (elementA.rating < elementB.rating) return -1;
              else return 0;
            })
          : state.videogames.sort((elementA, elementB) => {
              if (elementA.rating > elementB.rating) return -1;
              if (elementA.rating < elementB.rating) return 1;
              else return 0;
            });

      return {
        ...state,
        videogames: sortedArrayy,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        videogameDetail: [],
      };

    default:
      return state;
  }
}
