describe('Aprendendo conceitos importantes', () => { //descrição do que o arquivo de testes faz. 
  it('Acessando a pág inicial', () => {//descrição do teste case
    cy.visit('https://automationexercise.com/');
    cy.contains('Automation');//Verificando se estamos na tela inicial por verificar a presença dessa istrig
    cy.get('h1');
    cy.get('h1').contains('Automation');//Forma de filtrar a pesquisa. 
    cy.get('div.features_items');//usando a tag + class. 
  })














  
})