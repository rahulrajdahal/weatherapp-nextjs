describe('Landing Page E2E Test', () => {
  it('should visit the domain url and render landing page texts.', () => {
    cy.visit('/');

    cy.get('.min-h-screen').should(
      'contain.text',
      'Next App Router Starter Template'
    );
    cy.get('.pointer-events-none').should('contain.text', 'By Rahul Raj Dahal');
  });
});
