import React from 'react';
import OfflineBadge from './OfflineBadge';

describe('<OfflineBadge />', () => {
  it('renders with accessible status role and polite live region', () => {
    cy.mount(<OfflineBadge />);
    cy.get('[role="status"]')
      .should('be.visible')
      .and('have.attr', 'aria-live', 'polite');
  });

  it('displays the offline mode message and signal icon', () => {
    cy.mount(<OfflineBadge />);
    cy.contains('Offline Mode — Cached Data').should('be.visible');
    cy.contains('📡').should('be.visible');
  });

  it('renders timestamp when lastUpdated is provided', () => {
    cy.mount(<OfflineBadge lastUpdated="10:45 AM" />);
    cy.contains('(10:45 AM)').should('be.visible');
  });

  it('does not render timestamp when omitted', () => {
    cy.mount(<OfflineBadge />);
    cy.contains('(').should('not.exist');
  });

  it('applies high-contrast dark capsule styling classes', () => {
    cy.mount(<OfflineBadge className="custom-test-class" />);
    cy.get('[role="status"]')
      .should('have.class', 'bg-slate-900/90')
      .and('have.class', 'text-amber-300')
      .and('have.class', 'border-amber-400/40')
      .and('have.class', 'custom-test-class');
  });
});
