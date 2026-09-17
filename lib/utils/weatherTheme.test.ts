import { describe, expect, it } from 'vitest';
import { getAtmosphericTheme } from './weatherTheme';

describe('weatherTheme utilities', () => {
  it('returns Thunderstorm theme for storm-related conditions', () => {
    const themeThunder = getAtmosphericTheme('Thundery outbreaks possible');
    expect(themeThunder.name).toBe('Thunderstorm');

    const themeLightning = getAtmosphericTheme('Lightning storm');
    expect(themeLightning.name).toBe('Thunderstorm');
  });

  it('returns Snow theme for wintry conditions', () => {
    expect(getAtmosphericTheme('Light snow').name).toBe('Snow');
    expect(getAtmosphericTheme('Moderate or heavy sleet').name).toBe('Snow');
    expect(getAtmosphericTheme('Blizzard').name).toBe('Snow');
    expect(getAtmosphericTheme('Ice pellets').name).toBe('Snow');
  });

  it('returns Rain theme for rain and drizzle conditions', () => {
    expect(getAtmosphericTheme('Light rain shower').name).toBe('Rain');
    expect(getAtmosphericTheme('Patchy light drizzle').name).toBe('Rain');
    expect(getAtmosphericTheme('Torrential rain').name).toBe('Rain');
  });

  it('returns Cloudy Day or Cloudy Night depending on isDay flag', () => {
    expect(getAtmosphericTheme('Partly cloudy', true).name).toBe('Cloudy Day');
    expect(getAtmosphericTheme('Partly cloudy', false).name).toBe('Cloudy Night');

    expect(getAtmosphericTheme('Overcast', true).name).toBe('Cloudy Day');
    expect(getAtmosphericTheme('Overcast', false).name).toBe('Cloudy Night');

    expect(getAtmosphericTheme('Mist', true).name).toBe('Cloudy Day');
    expect(getAtmosphericTheme('Fog', false).name).toBe('Cloudy Night');
  });

  it('returns Clear Night for nighttime conditions without cloud/rain/snow/storm', () => {
    expect(getAtmosphericTheme('Clear', false).name).toBe('Clear Night');
    expect(getAtmosphericTheme('', false).name).toBe('Clear Night');
  });

  it('returns Sunny Day default for daytime conditions without matches', () => {
    expect(getAtmosphericTheme('Sunny', true).name).toBe('Sunny Day');
    expect(getAtmosphericTheme(undefined, true).name).toBe('Sunny Day');
    expect(getAtmosphericTheme('', true).name).toBe('Sunny Day');
  });

  it('handles case-insensitive condition strings properly', () => {
    expect(getAtmosphericTheme('HEAVY SNOW').name).toBe('Snow');
    expect(getAtmosphericTheme('THUNDER').name).toBe('Thunderstorm');
  });
});
