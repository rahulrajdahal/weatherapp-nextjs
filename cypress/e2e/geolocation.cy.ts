/// <reference types="cypress" />

describe('Geolocation Prompt Handling User Journey', () => {
  it('navigates to user coordinates and fetches forecast when geolocation is granted', () => {
    cy.intercept('GET', '**/api/weather/forecast*', {
      fixture: 'forecast.json',
    }).as('getInitialForecast');

    cy.intercept('GET', '**/api/weather/forecast?q=*51.52*', {
      fixture: 'comparison.json',
    }).as('getCoordsForecast');

    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
          (success) => {
            success({
              coords: {
                latitude: 51.52,
                longitude: -0.11,
                accuracy: 10,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
              },
              timestamp: Date.now(),
            });
          }
        );
      },
    });

    cy.wait('@getInitialForecast');

    cy.get('button[aria-label="Detect and use my current geolocation"]').click();

    cy.wait('@getCoordsForecast');
    cy.url().should('include', '51.52');
    cy.url().should('include', '-0.11');
    cy.contains('The current weather in').should('contain.text', 'London');
  });

  it('displays user-friendly notification when geolocation is denied', () => {
    cy.intercept('GET', '**/api/weather/forecast*', {
      fixture: 'forecast.json',
    }).as('getInitialForecast');

    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
          (_success, error) => {
            error({
              code: 1, // PERMISSION_DENIED
              PERMISSION_DENIED: 1,
              POSITION_UNAVAILABLE: 2,
              TIMEOUT: 3,
              message: 'User denied Geolocation',
            });
          }
        );
      },
    });

    cy.wait('@getInitialForecast');

    cy.get('button[aria-label="Detect and use my current geolocation"]').click();

    cy.contains('Location permission denied. Please search manually.').should(
      'be.visible'
    );
    cy.get('#main-content').should('be.visible');
    cy.contains('The current weather in').should('contain.text', 'Kathmandu');
  });
});
