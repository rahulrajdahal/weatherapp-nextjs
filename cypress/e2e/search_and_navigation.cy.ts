/// <reference types="cypress" />

describe('Search & Autocomplete Navigation User Journey', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/weather/forecast*', {
      fixture: 'forecast.json',
    }).as('getForecast');

    cy.intercept('GET', '**/api/weather/forecast?q=*London*', {
      fixture: 'comparison.json',
    }).as('getLondonForecast');

    cy.intercept('GET', '**/api/weather/search?q=*', {
      fixture: 'search.json',
    }).as('getSearch');

    cy.visit('/');
    cy.wait('@getForecast');
  });

  it('renders search input with accessible combobox attributes', () => {
    cy.get('input[role="combobox"]')
      .should('be.visible')
      .and(
        'have.attr',
        'aria-label',
        'Search for a location by city name or coordinates'
      )
      .and('have.attr', 'placeholder', 'Search city, region, or coordinates...');
  });

  it('triggers debounced autocomplete lookup and displays suggestion listbox', () => {
    cy.get('input[role="combobox"]').clear().type('London');
    cy.wait('@getSearch');

    cy.get('#location-suggestions-listbox').should('be.visible');
    cy.get('[role="option"]').should('have.length.at.least', 1);
    cy.contains(
      '[role="option"]',
      'London, City of London, Greater London, United Kingdom'
    ).should('be.visible');
  });

  it('navigates suggestions with keyboard arrow keys and selects via Enter', () => {
    cy.get('input[role="combobox"]').clear().type('London');
    cy.wait('@getSearch');

    cy.get('#location-suggestions-listbox').should('be.visible');
    cy.get('[role="option"]').should('have.length.at.least', 1);
    cy.get('input[role="combobox"]').type('{downarrow}');
    cy.get('[role="option"]').first().should('have.class', 'bg-blue-50');

    cy.get('input[role="combobox"]').type('{enter}');
    cy.url().should('include', 'q=London');
  });

  it('selects suggestion on click, updates URL, and loads new weather forecast', () => {
    cy.get('input[role="combobox"]').clear().type('London');
    cy.wait('@getSearch');

    cy.contains(
      '[role="option"]',
      'London, City of London, Greater London, United Kingdom'
    ).click();

    cy.url().should('include', 'q=London');
    cy.wait('@getLondonForecast');
    cy.contains('The current weather in').should('contain.text', 'London');
  });

  it('clears input and closes dropdown when clear button is clicked', () => {
    cy.get('input[role="combobox"]').clear().type('London');
    cy.wait('@getSearch');
    cy.get('#location-suggestions-listbox').should('be.visible');

    cy.get('button[aria-label="Clear search input"]').click();
    cy.get('input[role="combobox"]').should('have.value', '');
    cy.get('#location-suggestions-listbox').should('not.exist');
  });
});
