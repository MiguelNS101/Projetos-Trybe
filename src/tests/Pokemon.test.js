import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se é renderizado um card com as informações de determinado pokémon.',
  () => {
    renderWithRouter(<App />);

    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toHaveTextContent(/Pikachu/i);

    const typeName = screen.getByTestId('pokemon-type');
    expect(typeName).toHaveTextContent(/Electric/i);

    const pkmWeight = screen.getByTestId('pokemon-weight');
    expect(pkmWeight).toHaveTextContent(/Average weight: /i);
    expect(pkmWeight).toHaveTextContent(/6.0/i);
    expect(pkmWeight).toHaveTextContent(/kg/i);

    const sourceLink = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pkmImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pkmImg).toHaveAttribute('src', sourceLink);
    expect(pkmImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

test('Teste se o card do Pokémon contém um link de navegação para exibir detalhes',
  () => {
    renderWithRouter(<App />);
    const pkmDetails = screen.getByRole('link', { name: /More details/i });
    expect(pkmDetails).toHaveAttribute('href', '/pokemons/25');
  });

test('Teste se ao clicar no link, é feito o redirecionamento para a página de detalhes.',
  () => {
    renderWithRouter(<App />);

    const detailButton = screen.getByRole('link', { name: /More details/i });
    expect(detailButton).toBeInTheDocument();
    userEvent.click(detailButton);

    const pkmTitle = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pkmTitle).toBeInTheDocument();
  });

test('Teste também se a URL exibida no navegador muda para /pokemon/<id>',
  () => {
    const { history } = renderWithRouter(<App />);

    const detailButton = screen.getByRole('link', { name: /More details/i });
    expect(detailButton).toBeInTheDocument();
    userEvent.click(detailButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

test('Teste se existe um ícone de estrela nos Pokémons favoritados.',
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
  });
