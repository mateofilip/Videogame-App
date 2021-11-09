import './App.css';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import LandingPage from './components/LandingPage';
import VideogameCreation from './components/VideogameCreation';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/videogame" component={VideogameCreation} />
      </Switch>
    </div>
  );
}

export default App;
