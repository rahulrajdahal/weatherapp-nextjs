/// <reference types="cypress" />

describe('Favorites & City Comparison User Journey', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/weather/forecast*', {
      fixture: 'forecast.json',
    }).as('getForecast');

    cy.intercept('GET', '**/api/weather/forecast?q=*Auckland*', {
      fixture: 'comparison.json',
    }).as('getAucklandForecast');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });

    cy.wait('@getForecast');
  });

  it('renders default favorites in the quick-access bookmarks bar', () => {
    cy.contains('⭐ Bookmarks:').should('be.visible');
    cy.contains('button', 'Bhaktapur').should('be.visible');
    cy.contains('button', 'Auckland').should('be.visible');
  });

  it('navigates to a bookmarked city when its chip is clicked', () => {
    cy.contains('button', 'Auckland').click();
    cy.url().should('include', 'q=Auckland');
    cy.wait('@getAucklandForecast');
  });

  it('toggles bookmarking for the current location and updates the bar', () => {
    // Current location is Kathmandu, not yet bookmarked
    cy.get('button[aria-label="Bookmark Kathmandu to favorites"]')
      .should('have.attr', 'aria-pressed', 'false')
      .click();

    // Star button state updates to active
    cy.get('button[aria-label="Remove Kathmandu from bookmarked favorites"]')
      .should('have.attr', 'aria-pressed', 'true');

    // Kathmandu now appears in bookmarks bar
    cy.contains('button', 'Kathmandu').should('be.visible');

    // Removing it via the star button
    cy.get('button[aria-label="Remove Kathmandu from bookmarked favorites"]').click();
    cy.get('button[aria-label="Bookmark Kathmandu to favorites"]').should('exist');
  });

  it('removes a favorite chip using its dismiss button', () => {
    cy.get('button[aria-label="Remove Auckland from bookmarks"]').click();
    cy.contains('button', 'Auckland').should('not.exist');
  });

  it('opens and interacts with the City Comparison Modal', () => {
    cy.contains('button', 'Compare Cities').click();

    // Modal dialog is opened and trapped
    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('Side-by-Side City Comparison').should('be.visible');

    // Close modal via Escape key
    cy.get('body').type('{esc}');
    cy.get('[role="dialog"]').should('not.exist');

    // Reopen and close via close button
    cy.contains('button', 'Compare Cities').click();
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('button[aria-label="Close comparison modal"]').click();
    cy.get('[role="dialog"]').should('not.exist');
  });
});
