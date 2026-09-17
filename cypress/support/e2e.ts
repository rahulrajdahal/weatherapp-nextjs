// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Ignore React hydration mismatch errors in Cypress E2E runner
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Minified React error #418') ||
    err.message.includes('Minified React error #423') ||
    err.message.includes('Minified React error #425') ||
    err.message.includes('Hydration failed') ||
    err.message.includes('hydration')
  ) {
    return false;
  }
  return true;
});