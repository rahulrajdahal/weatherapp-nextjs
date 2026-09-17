'use client';

import React from 'react';
import SegmentedControl from '../SegmentedControl/SegmentedControl';

/**
 * Props for the UnitToggle component.
 */
export interface UnitToggleProps {
  /** Whether Celsius (°C) is currently active; false indicates Fahrenheit (°F) */
  isCelsius: boolean;
  /** Callback fired when the active unit scale changes */
  onChange: (isCelsius: boolean) => void;
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * UnitToggle renders an accessible temperature scale switcher between
 * Celsius (°C) and Fahrenheit (°F), composing the shared SegmentedControl component.
 */
export default function UnitToggle({
  isCelsius,
  onChange,
  className = '',
}: UnitToggleProps) {
  return (
    <SegmentedControl
      options={[
        { value: 'celsius', label: '°C', ariaLabel: 'Celsius scale' },
        { value: 'fahrenheit', label: '°F', ariaLabel: 'Fahrenheit scale' },
      ]}
      value={isCelsius ? 'celsius' : 'fahrenheit'}
      onChange={(val) => onChange(val === 'celsius')}
      size="sm"
      ariaLabel="Temperature unit scale"
      className={className}
    />
  );
}

