import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

test('Teste se é exibido No favorite pokemon found, se a pessoa não tiver favoritos.',
  () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavFound = screen.getByText(/No favorite pokemon found/i);
    expect(noFavFound).toBeInTheDocument();
  });

test('Teste se é exibido todos os cards de pokémons favoritados.',
  () => {
    renderWithRouter(<App />);
    const detailButton = screen.getByRole('link', { name: /More details/i });
    expect(detailButton).toBeInTheDocument();
    userEvent.click(detailButton);

    const favoriteCheck = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);

    const favoriteButton = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const pkmName = screen.getByText(/pikachu/i);
    expect(pkmName).toBeInTheDocument();
  });
