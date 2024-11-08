describe('Landing Page E2E Test', () => {
  beforeEach(() => {
    fetchForecast();
  });

  it('should visit the domain url and render landing page texts.', () => {
    cy.get('.py-5').should('contain.text', 'WeatherApp');
    cy.get('.md\\:flex-row > .justify-between').should('be.visible');
  });

  it('should visit the domain url and fetch the current weather.', function () {
    expect(this.currentForecast).to.haveOwnProperty('condition');
    expect(this.currentForecast)
      .to.haveOwnProperty('condition')
      .to.haveOwnProperty('text');
    expect(this.currentForecast)
      .to.haveOwnProperty('condition')
      .to.haveOwnProperty('icon');

    expect(this.currentForecast).to.haveOwnProperty('humidity');
    expect(this.currentForecast).to.haveOwnProperty('temp_c');
    expect(this.currentForecast).to.haveOwnProperty('last_updated');
    expect(this.currentForecast).to.haveOwnProperty('wind_kph');
  });
  it('should visit the domain url and fetch the current weather location.', function () {
    expect(this.currentLocation).to.haveOwnProperty('tz_id');
    expect(this.currentLocation).to.haveOwnProperty('name');
    expect(this.currentLocation).to.haveOwnProperty('country');
  });
});

const fetchForecast = () => {
  let latitude = 27.7293;
  let longitude = 85.3343;

  cy.visit('/');

  cy.request(
    `https://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&days=2&key=${Cypress.env('CYPRESS_NEXT_PUBLIC_WEATHER_APIKEY')}`
  )
    .its('body')
    .as('getForecast');
  cy.request(
    `https://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&days=2&key=${Cypress.env('CYPRESS_NEXT_PUBLIC_WEATHER_APIKEY')}`
  )
    .its('body')
    .its('current')
    .as('currentForecast');
  cy.request(
    `https://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&days=2&key=${Cypress.env('CYPRESS_NEXT_PUBLIC_WEATHER_APIKEY')}`
  )
    .its('body')
    .its('location')
    .as('currentLocation');
};
