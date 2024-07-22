/// <reference types="Cypress" />
describe('Aprendendo conceitos Cypress', () => {

  /*
  PRIMEIROS 3 TESTES COM CONCEITOS BÁSICOS 
  */

  // PRIMEIRO TESTE.
  it('1 - Acessando home da página Automation Exercise', () => {
    cy.visit('/');
    cy.contains('Automation'); // Captura o logotipo da página para se certificar de que está na página principal. Usa para tal o método "contains".
    cy.get('h1'); // Acessando tag
    cy.get('h1').contains('Automation'); // Método "get" em associação ao método contains.

    cy.get('.features_items'); // Verificar se a seção 'features items' existe na página inicial a partir da classe
    // ou
    cy.get('div.features_items'); // Tag + classe
  });

  // SEGUNDO TESTE.
  it('2 - Verificando itens para compra', () => {
    cy.visit('/');
    cy.get('.features_items'); // Acessando primeiro elemento filho do item
    cy.get('.features_items').children().first(); // Captura o primeiro
    cy.get('.features_items').children().last(); // Capturando o último elemento (os cards)
    cy.get('.features_items').children().eq(2); // Acessando elemento de array no caso o terceiro elemento por meio do método "eq"

    cy.get('[data-product-id="2"]'); // Pelo data-id o segundo botão, botão de adicionar ao carrinho
  });

  // TERCEIRO TESTE -- ASSERÇÕES E ENCADEAMENTO.

  it('3 - Usuário faz login com username e senha inválidos', () => {
    cy.visit('/');
    cy.get('div.shop.menu').contains('login').should('have.attr', 'href', '/login').click(); // Verificando se no menu suspenso está presente o atributo "href" e "Login" e por último clicando nele. O encadeamento de 3 ações, assim como em uma fila indiana.

    cy.contains('Login to your account').should('be.visible'); // Verifica na tela de login se a string está visível. O método "should" faz essa verificação.

    // VALIDAÇÕES EM CIMA DO CAMPO EMAIL.
    cy.get('[data-qa="login-email"]') // Pegando o login
      .type('Test@emial.com') // Enviando email
      .should('be.visible') // Verificando se está visível
      .and('have.attr', 'placeholder', 'Email Address') // Verificando a presença do placeholder 'Email Address' no campo de escrever o email. "have.attr" verifica inicialmente o atributo e por último o valor desse atributo.
      .and('have.prop', 'required'); // Verificando se o atributo é 'required' ou obrigatório.

    cy.get('[data-qa="login-password"]').type('12345').should('have.value', '12345'); // Confirmando se a senha está escrita.

    // Fim da aula em 7 minutos e 18 segundos.
  });

});

/*
TESTES EXPLORADOS PELA PROFESSORA.

it('1 - Usuário faz login com username e senha inválidos', () => {
  // Setup
  cy.visit('/');
  cy.get('div.shop-menu').contains('Login').click();
  cy.contains('Login to your account');
  // Preenchendo campos
  cy.get('[data-qa="login-email"]').type('cleibson@gmail.com');
  cy.get('[data-qa="login-password"]').type('123456');
  cy.get('[data-qa="login-button"]').contains('Login').click();
  // Verificação final
  cy.contains('Your email or password is incorrect!');

  // ABAIXO VERSÕES MAIS COMPLEXAS.

  cy.visit('/'); // Configuração
  cy.get('div.shop-menu').contains('Login').click(); // Acessa o elemento pai 'div.shop-menu' e captura pela string "Login"
  cy.contains('Login to your account').should('be.visible'); // Verificando se estou na página de login por meio da string
  cy.get('[data-qa="login-email"]')
    .type('teste@email.com')
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

  // Mesma validação acima.
  cy.get('[data-qa="login-button"]').should(($button) => {
    expect($button).to.have.text('Login');
    expect($button).to.contain('Login');
    expect($button).to.be.visible;
    expect($button).to.have.attr('type', 'submit');
    expect($button).to.have.class('btn');
  });

  // Uso do alias para clicar no botão de login.
  cy.get('@btnLogin').click();

  cy.contains('Your email or password is incorrect!');
  
});

it.only('4 - Colocar item no carrinho e continuar comprando', () => {
  cy.visit('/');
  cy.get('[data-product-id="2"]').contains('Add to cart').click();
  cy.get('#cartModal').contains('Added'); // # usado para ID exatamente porque ele não é uma classe
  cy.get('button.close-modal', { timeout: 5000 }).click();
});

it('5 - Acessando página de produtos - usando intercept', () => { // Método muito utilizado nos testes com interface gráfica
  cy.visit('/');
  cy.intercept('GET', '/products').as('getProdutos'); // Interceptando a rota de "products"
  cy.get('.navbar-nav').contains('Products').then(($btn) => {
    cy.wrap($btn).click();
  });
  cy.wait('@getProdutos').its('response.statusCode').should('eq', 200);

  cy.wait('@getProdutos').should((interception) => {
    expect(interception.response.statusCode).to.be.eq(200);
  });
  
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

*/