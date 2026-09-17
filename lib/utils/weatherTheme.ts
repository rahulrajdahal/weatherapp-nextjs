export interface AtmosphericTheme {
  name: string;
  backgroundGradient: string;
  heroGradient: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  textColor: string;
  glassBg: string;
  cardBorder: string;
}

export function getAtmosphericTheme(
  conditionText?: string,
  isDay: boolean = true
): AtmosphericTheme {
  const text = (conditionText || '').toLowerCase();

  // 1. Thunderstorm
  if (text.includes('thunder') || text.includes('lightning') || text.includes('storm')) {
    return {
      name: 'Thunderstorm',
      backgroundGradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
      heroGradient: 'linear-gradient(180deg, rgba(99, 102, 241, 0.4) 0%, rgba(30, 27, 75, 0.8) 100%)',
      accentColor: '#818cf8',
      badgeBg: 'rgba(99, 102, 241, 0.2)',
      badgeText: '#c7d2fe',
      textColor: '#f8fafc',
      glassBg: 'rgba(15, 23, 42, 0.75)',
      cardBorder: 'rgba(99, 102, 241, 0.3)',
    };
  }

  // 2. Snow / Sleet / Blizzard
  if (text.includes('snow') || text.includes('sleet') || text.includes('blizzard') || text.includes('ice') || text.includes('flurries')) {
    return {
      name: 'Snow',
      backgroundGradient: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      heroGradient: 'linear-gradient(180deg, rgba(147, 197, 253, 0.6) 0%, rgba(199, 210, 254, 0.9) 100%)',
      accentColor: '#60a5fa',
      badgeBg: 'rgba(219, 234, 254, 0.8)',
      badgeText: '#1e40af',
      textColor: '#f8fafc',
      glassBg: 'rgba(255, 255, 255, 0.85)',
      cardBorder: 'rgba(191, 219, 254, 0.6)',
    };
  }

  // 3. Rain / Drizzle / Shower
  if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
    return {
      name: 'Rain',
      backgroundGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0e7490 100%)',
      heroGradient: 'linear-gradient(180deg, rgba(56, 189, 248, 0.5) 0%, rgba(14, 116, 144, 0.85) 100%)',
      accentColor: '#38bdf8',
      badgeBg: 'rgba(14, 116, 144, 0.2)',
      badgeText: '#bae6fd',
      textColor: '#f0f9ff',
      glassBg: 'rgba(15, 23, 42, 0.7)',
      cardBorder: 'rgba(56, 189, 248, 0.25)',
    };
  }

  // 4. Overcast / Cloudy / Fog / Mist
  if (text.includes('cloud') || text.includes('overcast') || text.includes('fog') || text.includes('mist')) {
    if (!isDay) {
      return {
        name: 'Cloudy Night',
        backgroundGradient: 'linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e293b 100%)',
        heroGradient: 'linear-gradient(180deg, rgba(71, 85, 105, 0.6) 0%, rgba(15, 23, 42, 0.9) 100%)',
        accentColor: '#94a3b8',
        badgeBg: 'rgba(71, 85, 105, 0.4)',
        badgeText: '#cbd5e1',
        textColor: '#f8fafc',
        glassBg: 'rgba(15, 23, 42, 0.8)',
        cardBorder: 'rgba(100, 116, 139, 0.3)',
      };
    }
    return {
      name: 'Cloudy Day',
      backgroundGradient: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      heroGradient: 'linear-gradient(180deg, rgba(148, 163, 184, 0.7) 0%, rgba(203, 213, 225, 0.95) 100%)',
      accentColor: '#64748b',
      badgeBg: 'rgba(241, 245, 249, 0.9)',
      badgeText: '#334155',
      textColor: '#1e293b',
      glassBg: 'rgba(255, 255, 255, 0.9)',
      cardBorder: 'rgba(203, 213, 225, 0.6)',
    };
  }

  // 5. Clear Night
  if (!isDay) {
    return {
      name: 'Clear Night',
      backgroundGradient: 'linear-gradient(135deg, #020617 0%, #0b1120 40%, #1e1b4b 100%)',
      heroGradient: 'linear-gradient(180deg, rgba(99, 102, 241, 0.5) 0%, rgba(30, 27, 75, 0.9) 100%)',
      accentColor: '#a5b4fc',
      badgeBg: 'rgba(99, 102, 241, 0.25)',
      badgeText: '#e0e7ff',
      textColor: '#f8fafc',
      glassBg: 'rgba(15, 23, 42, 0.75)',
      cardBorder: 'rgba(99, 102, 241, 0.3)',
    };
  }

  // 6. Clear / Sunny Day (Default)
  return {
    name: 'Sunny Day',
    backgroundGradient: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 40%, #38bdf8 100%)',
    heroGradient: 'linear-gradient(180deg, rgba(132, 250, 176, 0.8) 0%, rgba(143, 211, 244, 0.95) 100%)',
    accentColor: '#0284c7',
    badgeBg: 'rgba(255, 255, 255, 0.9)',
    badgeText: '#0369a1',
    textColor: '#111625',
    glassBg: 'rgba(240, 244, 250, 0.95)',
    cardBorder: 'rgba(255, 255, 255, 0.6)',
  };
}
