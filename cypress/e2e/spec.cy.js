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

    cy.get('[data-qa="login-password"]').type('123456').should('have.value', '123456');

    cy.get('[data-qa="login-button"]').as('btnLogin').then(($button) => {
      expect($button).to.have.text('Login');
      expect($button).to.contain('Login');
      expect($button).to.be.visible;
      expect($button).to.have.attr('type', 'submit');
      expect($button).to.have.class('btn');
      cy.wrap($button).click();
    });

    cy.get('@btnLogin').click();
    cy.contains('Your email or password is incorrect!')
  });

  it('4 - Acessando página de produtos - usando intercept', () => {
    cy.visit('/');
    cy.intercept('GET','/products').as('getProducts')

    cy.get('.navbar-nav').contains('Products').then(($btn) => {

      cy.wrap($btn).click();

    });

    cy.wait('@getProdutos').its('responseStatusCode').should('eq',200);
      
  });

});