import Component from './Component';

describe('<Component />', () => {
  it('renders', () => {
    cy.mount(<Component />);
  });
  it('Contains the Component text.', () => {
    cy.mount(<Component />);

    cy.get('[data-cy-root=""] > div').should(
      'contain.text',
      'This is a Component'
    );
  });
});
