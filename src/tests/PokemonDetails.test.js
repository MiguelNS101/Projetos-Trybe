import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
  () => {
    renderWithRouter(<App />);

    const detailButton = screen.getByRole('link', { name: /More details/i });
    expect(detailButton).toBeInTheDocument();
    userEvent.click(detailButton);

    const pkmTitle = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pkmTitle).toBeInTheDocument();

    expect(detailButton).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summary).toBeInTheDocument();

    const details = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(details).toBeInTheDocument();
  });

test('Teste se existe na página uma seção com os mapas com as localizações do pokémon',
  () => {
    renderWithRouter(<App />);

    const detailButton = screen.getByRole('link', { name: /More details/i });
    expect(detailButton).toBeInTheDocument();
    userEvent.click(detailButton);

    const gameLoc = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    expect(gameLoc).toBeInTheDocument();

    const maps = screen.getAllByAltText(/Pikachu Location/i);
    expect(maps).toHaveLength(2);

    const mapSrc1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(maps[0]).toHaveAttribute('src', mapSrc1);

    const mapSrc2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(maps[1]).toHaveAttribute('src', mapSrc2);
  });

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
  () => {
    renderWithRouter(<App />);
    const detailButton = screen.getByRole('link', { name: /More details/i });
    expect(detailButton).toBeInTheDocument();
    userEvent.click(detailButton);

    const favoriteCheck = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);

    const sourceLink = '/star-icon.svg';
    const pkmImg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(pkmImg).toHaveAttribute('src', sourceLink);
    expect(pkmImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');

    userEvent.click(favoriteCheck);

    expect(pkmImg).not.toBeInTheDocument();
  });
