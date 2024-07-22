/// <reference types="Cypress" />
describe('Aprendendo conceitos Cypress', () => {

  it('1 - Acessando home da página Automation Exercise', () => {
    cy.visit('/');
    cy.contains('Automation');
    cy.get('h1');
    cy.get('h1').contains('Automation');
    cy.get('.features_items');
    cy.get('div.features_items');
  });

  it('2 - Verificando itens para compra', () => {
    cy.visit('/');
    cy.get('.features_items');
    cy.get('.features_items').children().first();
    cy.get('.features_items').children().last();
    cy.get('.features_items').children().eq(2);
    cy.get('[data-product-id="2"]');
  });

  

});