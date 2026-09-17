import React from 'react';
import AlertBanner from './AlertBanner';
import { IWeatherAlert } from '@/lib/types/weather';

const mockAlerts: IWeatherAlert[] = [
  {
    event: 'Severe Thunderstorm Warning',
    severity: 'Severe',
    headline: 'Severe Thunderstorm Warning in effect until 7:00 PM EDT',
    desc: 'At 5:15 PM EDT, severe thunderstorms capable of producing damaging winds and hail were located near the metropolitan area.',
    instruction: 'Move to an interior room on the lowest floor. Avoid windows.',
    effective: '2026-09-16 17:15',
    expires: '2026-09-16 19:00',
  },
];

describe('<AlertBanner />', () => {
  it('renders nothing when alerts list is empty or undefined', () => {
    cy.mount(<AlertBanner alerts={[]} />);
    cy.get('aside').should('not.exist');

    cy.mount(<AlertBanner />);
    cy.get('aside').should('not.exist');
  });

  it('renders accessible alert landmark with live region announcements', () => {
    cy.mount(<AlertBanner alerts={mockAlerts} />);
    cy.get('aside[role="region"]')
      .should('be.visible')
      .and('have.attr', 'aria-label', 'Weather alerts')
      .and('have.attr', 'aria-live', 'polite');
  });

  it('displays event headline, severity chip, and warning icon', () => {
    cy.mount(<AlertBanner alerts={mockAlerts} />);
    cy.contains('Severe Thunderstorm Warning').should('be.visible');
    cy.contains('Severe').should('be.visible');
    cy.contains('⚠️').should('be.visible');
  });

  it('toggles instruction drawer with aria-expanded and aria-controls state management', () => {
    cy.mount(<AlertBanner alerts={mockAlerts} />);

    // Initially collapsed
    cy.get('button[aria-controls="alert-details-content"]')
      .should('have.attr', 'aria-expanded', 'false')
      .and('contain.text', 'View Details');
    cy.get('#alert-details-content').should('not.exist');

    // Click to expand
    cy.get('button[aria-controls="alert-details-content"]').click();
    cy.get('button[aria-controls="alert-details-content"]')
      .should('have.attr', 'aria-expanded', 'true')
      .and('contain.text', 'Hide Details');

    cy.get('#alert-details-content').should('be.visible');
    cy.contains('Move to an interior room on the lowest floor').should('be.visible');
    cy.contains('Effective: 2026-09-16 17:15').should('be.visible');

    // Click to collapse
    cy.get('button[aria-controls="alert-details-content"]').click();
    cy.get('button[aria-controls="alert-details-content"]')
      .should('have.attr', 'aria-expanded', 'false');
    cy.get('#alert-details-content').should('not.exist');
  });

  it('applies high-contrast dark capsule styling and visible focus rings', () => {
    cy.mount(<AlertBanner alerts={mockAlerts} className="custom-alert-class" />);
    cy.get('aside[role="region"]')
      .should('have.class', 'bg-slate-900/95')
      .and('have.class', 'border-amber-500/50')
      .and('have.class', 'custom-alert-class');

    cy.get('button[aria-controls="alert-details-content"]')
      .should('have.class', 'focus-visible:ring-2')
      .and('have.class', 'focus-visible:ring-amber-400');
  });
});
