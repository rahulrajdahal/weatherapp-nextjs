describe('Landing Page E2E Test', () => {
  it('should visit the domain url and render landing page texts.', () => {
    cy.visit('/');

    cy.get('.py-5').should('contain.text', 'WeatherApp');
    cy.get('.md\\:flex-row > .justify-between').should('be.visible');
    cy.get('.mt-0').should('contain.text', 'The current weather in');
  });

  it('should visit the domain url and fetch the current weather.', () => {
    let latitude = 27.7293;
    let longitude = 85.3343;

    cy.visit('/');

    cy.intercept(
      `https://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&days=2&key=${Cypress.env('NEXT_PUBLIC_WEATHER_APIKEY')}`,
      (req) =>
        req.continue((res) => {
          const body = res.body;
          expect(body).to.haveOwnProperty('current');
          expect(body).to.haveOwnProperty('forecast');
          expect(body).to.haveOwnProperty('location');

          const current = body.current;

          expect(current).to.haveOwnProperty('condition');
          expect(current).to.haveOwnProperty('humidity');
          expect(current).to.haveOwnProperty('temp_c');
          expect(current).to.haveOwnProperty('time');
          expect(current).to.haveOwnProperty('tz_id');
          expect(current).to.haveOwnProperty('wind_kph');

          const forecast = body.forecast;

          expect(forecast).to.haveOwnProperty('forecastday');
        })
    );
  });
});
