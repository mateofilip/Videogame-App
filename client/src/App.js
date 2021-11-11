import './Sass/Styles/App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGenres, fetchVideogames } from './store/actions';
import Homepage from './components/Homepage';
import LandingPage from './components/LandingPage';
import VideogameCreation from './components/VideogameCreation';
import VideogameDetail from './components/VideogameDetail';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideogames());
    dispatch(fetchGenres());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/homepage" component={Homepage} />
          <Route exact path="/videogame" component={VideogameCreation} />
          <Route path="/videogame/:id" component={VideogameDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
