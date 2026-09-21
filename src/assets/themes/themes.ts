import { DiceTheme } from '../../store/settingsStore';

export interface ThemeDefinition {
  accent: string;
  background: string;
  face: string;
  id: DiceTheme;
  label: string;
  premium: boolean;
  text: string;
}

export const themes: ThemeDefinition[] = [
  {
    id: 'classic',
    label: 'Klasik',
    premium: false,
    background: '#101426',
    face: '#6978FF',
    accent: '#F4C95D',
    text: '#F7F8FF',
  },
  {
    id: 'neon',
    label: 'Neon',
    premium: true,
    background: '#100D1F',
    face: '#D64DFF',
    accent: '#5DFFDA',
    text: '#FFF6FF',
  },
  {
    id: 'sunset',
    label: 'Gün Batımı',
    premium: true,
    background: '#21131D',
    face: '#FF765F',
    accent: '#FFD166',
    text: '#FFF7EF',
  },
  {
    id: 'midnight',
    label: 'Gece',
    premium: true,
    background: '#0A1824',
    face: '#27B7D8',
    accent: '#B8F2E6',
    text: '#F0FFFF',
  },
];

export function getTheme(theme: DiceTheme): ThemeDefinition {
  return themes.find((item) => item.id === theme) ?? themes[0];
}
