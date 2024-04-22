import HourForecastCard, { initialProps } from './HourForecastCard';

describe('<HourForecastCard />', () => {
  it('renders', () => {
    cy.mount(<HourForecastCard {...initialProps} />);
  });

  it('should render drop icon.', () => {
    cy.readFile('assets/icons/drop.svg', null).then((img) => {
      // Intercept requests to Next.js backend image endpoint
      cy.intercept('_next/static/media/*', {
        statusCode: 200,
        headers: { 'Content-Type': 'image/svg+xml' },
        body: img.buffer,
      });
      cy.mount(<HourForecastCard {...initialProps} />);
      cy.get(':nth-child(1) > .h-6').should(
        'have.attr',
        'src',
        '/_next/static/media/drop.eae8cdee.svg'
      );
      cy.get(':nth-child(1) > .h-6').should('have.attr', 'alt', 'humidity');
    });
  });

  it('should render wind icon.', () => {
    cy.readFile('assets/icons/wind.svg', null).then((windImg) => {
      // Intercept requests to Next.js backend image endpoint
      cy.intercept('_next/static/media/*', {
        statusCode: 200,
        headers: { 'Content-Type': 'image/svg+xml' },
        body: windImg.buffer,
      });
      cy.mount(<HourForecastCard {...initialProps} />);
      cy.get(':nth-child(2) > .h-6').should(
        'have.attr',
        'src',
        '/_next/static/media/wind.109bccdb.svg'
      );
      cy.get(':nth-child(2) > .h-6').should('have.attr', 'alt', 'windSpeed');
    });
  });

  it('should render the forecast card with proper props', () => {
    cy.mount(<HourForecastCard {...initialProps} />);
    cy.get('.bg-grey-200').should('be.visible');
    cy.get('.bg-grey-200').should('have.attr', 'title');
  });
});
