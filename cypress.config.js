const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com/', // Configurando a URL base para que os testes sempre usem a mesma URL
    setupNodeEvents(on, config) {
      // Implementar listeners de eventos do Node aqui
    },
  },
});
