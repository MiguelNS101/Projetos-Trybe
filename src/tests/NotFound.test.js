import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/notfound');
  const notFoundTitle = screen.getByRole('heading', {
    name: /Page requested not found/,
  });
  expect(notFoundTitle).toBeInTheDocument();

  const { pathname } = history.location;
  expect(pathname).toBe('/notfound');
});

test('Teste se página mostra a imagem', () => {
  const sourceLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  const { history } = renderWithRouter(<App />);
  history.push('/notfound');

  const cryPikachu = screen.getByAltText(
    /Pikachu crying because the page requested was not found/i,
  );
  expect(cryPikachu).toHaveAttribute('src', sourceLink);
});
