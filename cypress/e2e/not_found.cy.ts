/// <reference types="cypress" />

describe('404 Not Found Page E2E Journey', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/weather/forecast*', {
      fixture: 'forecast.json',
    }).as('getForecast');

    cy.visit('/non-existent-route-404', { failOnStatusCode: false });
  });

  it('renders the 404 not-found page with accessible landmarks and text', () => {
    cy.get('#main-content').should('be.visible');
    cy.get('h1').should('contain.text', 'Lost in the Clouds');
    cy.contains('404 • Lost in the Atmosphere').should('be.visible');
    cy.contains('Return to Dashboard').should('be.visible');
  });

  it('displays featured location quick-links', () => {
    cy.contains('Or jump to a featured location').should('be.visible');
    cy.contains('a', 'Kathmandu').should('have.attr', 'href', '/?q=Kathmandu');
    cy.contains('a', 'London').should('have.attr', 'href', '/?q=London');
    cy.contains('a', 'Tokyo').should('have.attr', 'href', '/?q=Tokyo');
  });

  it('navigates back to home dashboard when "Return to Dashboard" is clicked', () => {
    cy.contains('a', 'Return to Dashboard').click();
    cy.wait('@getForecast');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('section[aria-label="Current Weather Summary"]').should('be.visible');
  });

  it('navigates to featured city when clicked from 404 page', () => {
    cy.contains('a', 'London').click();
    cy.url().should('include', 'q=London');
  });
});
