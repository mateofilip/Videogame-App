import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import Homepage from './components/Homepage';

test('renders a videogame creation link', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </Provider>
  );
  const creationLink = screen.getByText('Create Videogame');
  expect(creationLink).toBeInTheDocument();
});

test('renders a videogame refresh button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </Provider>
  );
  const refreshButton = screen.getByText('Refresh all Videogames');
  expect(refreshButton).toBeInTheDocument();
});
