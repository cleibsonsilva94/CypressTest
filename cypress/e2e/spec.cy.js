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

  it.only('3 - Usuário faz login com username e senha inválidos', () => {
    cy.visit('/');
    cy.get('div.shop-menu').contains('Login').should('have.attr', 'href', '/login').click();

    cy.contains('Login to your account').should('be.visible');
    cy.get('[data-qa="login-email"]')
      .type('Test@emial.com')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email Address')
      .and('have.prop', 'required');

    cy.get('[data-qa="login-password"]').type('12345').should('have.value', '12345');

    cy.get('@btnLogin').click();

    cy.contains('Your email or password is incorrect!');
  });

});