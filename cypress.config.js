const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/', //Configurando para que testes sempre usem a mesma URL 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});