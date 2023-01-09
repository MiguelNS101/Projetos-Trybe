const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste se productDetails é uma função.
    expect(productDetails).toBe(productDetails);

    // Teste se o retorno da função é um array.
    expect(typeof productDetails()).toBe('object');

    // Teste se o array retornado pela função contém dois itens dentro.
    expect(productDetails('Alcool gel', 'Máscara')).toHaveLength(2);

    // Teste se os dois itens dentro do array retornado pela função são objetos.
    const typeProd = productDetails('Alcool gel', 'Máscara');
    expect(typeof typeProd[0]).toBe('object');
    expect(typeof typeProd[1]).toBe('object');

    // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.
    const test = productDetails('Alcool gel', 'Máscara');
    expect(test[0]).not.toBe(test[1]);

    // Teste se os dois productIds terminam com 123.
    const testa = productDetails('Alcool gel', 'Máscara');
    expect(testa[0].details.productId).toMatch('123');
    expect(testa[1].details.productId).toMatch('123');
  });
});
