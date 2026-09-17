import HourForecastCard, { initialProps } from './HourForecastCard';

describe('<HourForecastCard />', () => {
  it('renders', () => {
    cy.mount(<HourForecastCard {...initialProps} />);
    cy.get('article').should('be.visible');
  });

  it('should render humidity and wind speed indicators', () => {
    cy.mount(<HourForecastCard {...initialProps} />);
    cy.get('span[title="Humidity: 45%"]').should('be.visible');
    cy.get('span[title="Wind: 10 km/h"]').should('be.visible');
    cy.contains('45%').should('be.visible');
    cy.contains('10km/h').should('be.visible');
  });

  it('should render the forecast card with proper props and attributes', () => {
    cy.mount(<HourForecastCard {...initialProps} />);
    cy.get('article[title="Sunny"]').should('be.visible');
    cy.contains('24').should('be.visible');
    cy.contains('Sunny').should('be.visible');
  });

  it('should render the active "Now" badge when isCurrentHour is true', () => {
    cy.mount(<HourForecastCard {...initialProps} isCurrentHour={true} />);
    cy.contains('Now').should('be.visible');
  });
});

