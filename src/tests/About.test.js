import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />);
  const aboutP = screen.getByText(/This application simulates a Pokédex, a digital/i);
  expect(aboutP).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex.',
  () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.',
  () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();
  });

test('Teste se a página contém a seguinte imagem de uma Pokédex:',
  () => {
    const sourceLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toHaveAttribute('src', sourceLink);
  });
