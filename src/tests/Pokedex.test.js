import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pkdx = [
  'Pikachu',
  'Charmander',
  'Caterpie',
  'Ekans',
  'Alakazam',
  'Mew',
  'Rapidash',
  'Snorlax',
  'Dragonair',
  'Pikachu',
];

const pkms = [
  'Pikachu',
  'Charmander',
  'Caterpie',
  'Ekans',
  'Alakazam',
  'Snorlax',
  'Dragonair',
];

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const homeTitle = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2,
  });
  expect(homeTitle).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado.',
  () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId('next-pokemon');
    pkdx.forEach((pkm) => {
      const pkmName = screen.getByText(pkm);
      expect(pkmName).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });

test('Teste se é mostrado apenas um Pokémon por vez.',
  () => {
    renderWithRouter(<App />);
    const pkmName = screen.getAllByTestId('pokemon-name');
    expect(pkmName).toHaveLength(1);
  });

test('Teste se a Pokédex tem os botões de filtro.',
  () => {
    renderWithRouter(<App />);
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    typeButton.forEach((type, index) => {
      expect(type).toBeInTheDocument();
      userEvent.click(type);
      const pkmName = screen.getByText(pkms[index]);
      expect(pkmName).toBeInTheDocument();
    });
  });

test('Teste se a Pokédex contém um botão para resetar o filtro',
  () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByText(/Pikachu/i);
    expect(pikachuName).toBeInTheDocument();

    const fireButton = screen.getByRole('button', { name: /Fire/i });
    expect(fireButton).toBeInTheDocument();
    userEvent.click(fireButton);

    const charmanderName = screen.getByText(/Charmander/i);
    expect(charmanderName).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(pikachuName).toBeInTheDocument();
  });
