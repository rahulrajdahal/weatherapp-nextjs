'use client';

import React from 'react';

/**
 * An individual option for the SegmentedControl component.
 */
export interface SegmentedControlOption<T extends string> {
  /** Unique value string identifying this option */
  value: T;
  /** Visual display label (text, node, or icon) */
  label: React.ReactNode;
  /** Optional icon displayed before the label */
  icon?: React.ReactNode;
  /** Accessible label used by screen readers */
  ariaLabel?: string;
}

/**
 * Props for the SegmentedControl component.
 */
export interface SegmentedControlProps<T extends string> {
  /** Array of selectable option objects */
  options: SegmentedControlOption<T>[];
  /** Currently selected option value */
  value: T;
  /** Callback fired when an option is selected */
  onChange: (value: T) => void;
  /** Size variant controlling padding and font scale */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible name for the control container */
  ariaLabel?: string;
  /** ARIA role for the control container ('radiogroup' | 'tablist') */
  role?: 'radiogroup' | 'tablist';
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * SegmentedControl renders an accessible WAI-ARIA radiogroup/tablist control with keyboard
 * arrow navigation, animated active selection pills, and customizable sizes and icons.
 */
export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  ariaLabel = 'View options',
  role = 'radiogroup',
  className = '',
}: SegmentedControlProps<T>) {
  const isTablist = role === 'tablist';

  const sizeClasses = {
    sm: 'p-0.5 text-xs',
    md: 'p-0.5 sm:p-1 text-xs sm:text-sm',
    lg: 'p-1 sm:p-1.5 text-sm sm:text-base',
  };

  const buttonSizeClasses = {
    sm: 'px-2 sm:px-2.5 py-1 text-xs gap-1',
    md: 'px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm gap-1 sm:gap-1.5',
    lg: 'px-3.5 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base gap-1.5 sm:gap-2',
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % options.length;
      onChange(options[nextIndex].value);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      onChange(options[prevIndex].value);
    }
  };

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      className={`inline-flex items-center rounded-2xl bg-slate-200/70 backdrop-blur-md border border-white/40 shadow-inner ${sizeClasses[size]} ${className}`}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            role={isTablist ? 'tab' : 'radio'}
            type="button"
            aria-checked={isTablist ? undefined : isSelected}
            aria-selected={isTablist ? isSelected : undefined}
            aria-label={option.ariaLabel}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`relative flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
              buttonSizeClasses[size]
            } ${
              isSelected
                ? 'bg-white text-slate-900 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            {option.icon && (
              <span className="flex-shrink-0" aria-hidden="true">
                {option.icon}
              </span>
            )}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
