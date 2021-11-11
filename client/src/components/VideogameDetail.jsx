import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchById, clearDetail } from '../store/actions';
import { useEffect } from 'react';
import '../Sass/Styles/VideogameDetail.scss';

export default function VideogameDetail(props) {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogameDetail);

  useEffect(() => {
    dispatch(fetchById(props.match.params.id));
  }, [dispatch]);

  function clickHandler(event) {
    dispatch(clearDetail());
  }

  console.log(videogame);

  return (
    <div>
      {videogame.name ? (
        <div className="VideogameDetail">
          <h1>{videogame.name}</h1>
          <h5>{videogame.genres.join('-')}</h5>
          <h5>{videogame.platforms.join(', ')}</h5>
          <img src={videogame.image} alt="imagen" />
          <h6>{videogame.rating}</h6>
          <h6>{videogame.releaseDate}</h6>
          <p>{videogame.description}</p>
          <Link to="/homepage">
            <button onClick={(event) => clickHandler(event)}>Back!</button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
