import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/Home/i);
    expect(links[1]).toHaveTextContent(/About/i);
    expect(links[2]).toHaveTextContent(/Favorite Pokémons/i);
  });

test('Teste se é redirecionada para a página inicial, na URL / ao clicar no link Home.',
  () => {
    const { history } = renderWithRouter(<App />);

    const homeButton = screen.getByRole('link', { name: /Home/i });
    expect(homeButton).toBeInTheDocument();
    userEvent.click(homeButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(homeTitle).toBeInTheDocument();
  });

test('Teste se é redirecionada para About, na URL /about, ao clicar no link About.',
  () => {
    const { history } = renderWithRouter(<App />);

    const aboutButton = screen.getByRole('link', { name: /About/i });
    expect(aboutButton).toBeInTheDocument();
    userEvent.click(aboutButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

test('Teste se é redirecionada para Pokémons Favoritados, ao clicar no Favorite Pokémons',
  () => {
    const { history } = renderWithRouter(<App />);

    const favoriteButton = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoriteTitle = screen.getByRole('heading', { name: /Favorite pokémons/i });
    expect(favoriteTitle).toBeInTheDocument();
  });

test('Teste se é redirecionada para Not Found ao entrar em uma URL desconhecida.',
  () => {
    const { history } = renderWithRouter(<App />);

    history.push('/notfound');
    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/ });
    expect(notFoundTitle).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/notfound');
  });
