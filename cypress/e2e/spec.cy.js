/// <reference types="Cypress" />
describe('Aprendendo conceitos Cypress', () => {
  // PRIMEIRO TESTE.
  it('2 - Acessando home da página Automation Exercise', () => {
    cy.visit('/');
    cy.contains('Automation'); // captura o logotipo da página para se certificar de que está na página principal. Usa para tal o método "Contains"
    cy.get('h1'); // acessando tag
    cy.get('h1').contains('Automation'); // Método "get" em associação ao método contains.

    cy.get('.features_items'); // verificar se a seção 'features items' existe na página inicial a partir da classe
    // ou
    cy.get('div.features_items'); // tag + classe
  });
  // SEGUNDO TESTE
  it('3 - Verificando itens para compra', () => {
    cy.visit('/');
    cy.get('.features_items'); // acessando primeiro elemento filho do item
    cy.get('.features_items').children().first(); // Captura o primeiro
    cy.get('.features_items').children().last(); // capturando o último elemento (Os cards)
    cy.get('.features_items').children().eq(2); // acessando elemento de array no caso o terceiro elemento por meio do método "eq"

    cy.get('[data-product-id="2"]'); // pelo data-id o segundo botão, botão de adicionar ao carrinho
  });
  // TERCEIRO TESTE
  it.only('1 - Usuário faz login com username e senha inválidos', () => {
    // setup
    cy.visit('/');
    cy.get('div.shop-menu').contains('Login').click();
    cy.contains('Login to your account');
    // Preenchendo campos
    cy.get('[data-qa="login-email"]').type('cleibson@gmail.com');
    cy.get('[data-qa="login-password"]').type('123456');
    cy.get('[data-qa="login-button"]').contains('Login').click();
    // verificação final
    cy.contains('Your email or password is incorrect!');

    // ABAIXO VERSÕES MAIS COMPLEXAS
    /*
    cy.visit('/'); // configuração
    cy.get('div.shop-menu').contains('Login').click(); // Acessa o elemento pai 'div.shop-menu' e capturando pela string "Login"
    cy.contains('Login to your account').should('be.visible'); // verificando se estou na pág de login por meio da string
    cy.get('[data-qa="login-email"]')
      .type('teste@email.com')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Email Address')
      .and('have.prop', 'required');
    cy.get('[data-qa="login-password"]').type('123456').should('have.value', '123456');
    // cy.get('[data-qa="login-button"]').contains('Login').click();
    cy.get('[data-qa="login-button"]').as('btnLogin').then(($button) => {
      expect($button).to.have.text('Login');
      expect($button).to.contain('Login');
      expect($button).to.be.visible;
      expect($button).to.have.attr('type', 'submit');
      expect($button).to.have.class('btn');
      cy.wrap($button).click();
    });
    // mesma validação acima
    cy.get('[data-qa="login-button"]').should(($button) => {
      expect($button).to.have.text('Login');
      expect($button).to.contain('Login');
      expect($button).to.be.visible;
      expect($button).to.have.attr('type', 'submit');
      expect($button).to.have.class('btn');
    });

    // uso do alias para clicar no botão de login
    cy.get('@btnLogin').click();

    cy.contains('Your email or password is incorrect!');
    */
  });

  it('4 - Colocar item no carrinho e continuar comprando', () => {
    cy.visit('/');
    cy.get('[data-product-id="2"]').contains('Add to cart').click();
    cy.get('#cartModal').contains('Added');
    cy.get('button.close-modal', { timeout: 5000 }).click();
  });

  it('5 - Acessando página de produtos - usando intercept', () => {
    cy.visit('/');
    cy.intercept('GET', '/products').as('getProdutos');
    cy.get('.navbar-nav').contains('Products').then(($btn) => {
      cy.wrap($btn).click();
    });
    cy.wait('@getProdutos').its('response.statusCode').should('eq', 200);

    /*
    cy.wait('@getProdutos').should((interception) => {
      expect(interception.response.statusCode).to.be.eq(200)
    });
    */
  });

  it('6 - GET Produtos retorna 200 - usando request', () => {
    cy.request('GET', 'api/productsList').should((response) => {
      expect(response.status).to.be.eq(200);
      expect(response.body).not.to.be.empty;
      let body = JSON.parse(response.body);
      expect(body.products).to.be.an('array');
      expect(body.products).to.have.length.above(1);
    });
  });
});
