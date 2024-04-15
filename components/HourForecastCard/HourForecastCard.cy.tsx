import HourForecastCard, { initialProps } from './HourForecastCard';

describe('<HourForecastCard />', () => {
  it('renders', () => {
    cy.mount(<HourForecastCard {...initialProps} />);
  });
  it('Contains the Component text.', () => {
    cy.mount(<HourForecastCard {...initialProps} />);

    cy.get('[data-cy-root=""] > div').should(
      'contain.text',
      'This is a Component'
    );
  });
});
