import { IAirQuality } from '@/lib/types/weather';

export function getAqiCategory(index?: number): {
  label: string;
  color: string;
  bgColor: string;
  description: string;
} {
  switch (index) {
    case 1:
      return {
        label: 'Good',
        color: '#15803d',
        bgColor: '#dcfce7',
        description: 'Air quality is satisfactory and poses little or no risk.',
      };
    case 2:
      return {
        label: 'Moderate',
        color: '#ca8a04',
        bgColor: '#fef9c3',
        description: 'Acceptable; sensitive individuals may experience minor symptoms.',
      };
    case 3:
      return {
        label: 'Unhealthy for Sensitive Groups',
        color: '#d97706',
        bgColor: '#ffedd5',
        description: 'Members of sensitive groups may experience health effects.',
      };
    case 4:
      return {
        label: 'Unhealthy',
        color: '#dc2626',
        bgColor: '#fee2e2',
        description: 'Everyone may begin to experience health effects.',
      };
    case 5:
      return {
        label: 'Very Unhealthy',
        color: '#7c3aed',
        bgColor: '#f3e8ff',
        description: 'Health alert: increased risk for everyone.',
      };
    case 6:
      return {
        label: 'Hazardous',
        color: '#831843',
        bgColor: '#fce7f3',
        description: 'Health warning of emergency conditions.',
      };
    default:
      return {
        label: 'Moderate',
        color: '#4b5563',
        bgColor: '#f3f4f6',
        description: 'Air quality information available.',
      };
  }
}

export function getUvCategory(uv?: number): {
  label: string;
  color: string;
  textColor: string;
  advice: string;
} {
  const value = uv ?? 0;
  if (value <= 2) {
    return {
      label: 'Low',
      color: '#16a34a',
      textColor: '#ffffff',
      advice: 'No protection needed. You can safely stay outside.',
    };
  }
  if (value <= 5) {
    return {
      label: 'Moderate',
      color: '#eab308',
      textColor: '#0f172a',
      advice: 'Wear sunglasses and SPF 30+ sunscreen around midday.',
    };
  }
  if (value <= 7) {
    return {
      label: 'High',
      color: '#ea580c',
      textColor: '#ffffff',
      advice: 'Cover up, wear a hat, and seek shade during peak hours.',
    };
  }
  if (value <= 10) {
    return {
      label: 'Very High',
      color: '#dc2626',
      textColor: '#ffffff',
      advice: 'Extra protection required. Avoid sun exposure between 11 AM - 4 PM.',
    };
  }
  return {
    label: 'Extreme',
    color: '#7c3aed',
    textColor: '#ffffff',
    advice: 'Take all precautions. Unprotected skin can burn in minutes.',
  };
}
