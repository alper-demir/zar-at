export type DiceFinish = 'matte' | 'glossy' | 'neon';

export interface DiceAppearance {
  bodyColor: string;
  finish: DiceFinish;
  pipColor: string;
}

export interface TableAppearance {
  backgroundColor: string;
  accentColor: string;
}

export interface DicePreset {
  firstDice: DiceAppearance;
  id: string;
  name: string;
  secondDice: DiceAppearance;
  table: TableAppearance;
}

export const DEFAULT_DICE_APPEARANCE: DiceAppearance = {
  bodyColor: '#6978FF',
  finish: 'glossy',
  pipColor: '#FFFFFF',
};

export const DICE_BODY_OPTIONS = [
  { color: '#6978FF', label: 'Klasik', premium: false },
  { color: '#FFFFFF', label: 'Fildişi', premium: false },
  { color: '#D64DFF', label: 'Neon', premium: true },
  { color: '#FF765F', label: 'Mercan', premium: true },
  { color: '#27B7D8', label: 'Buz', premium: true },
] as const;

export const DICE_PIP_OPTIONS = [
  { color: '#FFFFFF', label: 'Beyaz', premium: false },
  { color: '#101426', label: 'Gece', premium: false },
  { color: '#5DFFDA', label: 'Mint', premium: true },
  { color: '#FFD166', label: 'Altın', premium: true },
] as const;

interface DiceFinishOption {
  id: DiceFinish;
  label: string;
  premium: boolean;
}

export const DICE_FINISH_OPTIONS: DiceFinishOption[] = [
  { id: 'matte', label: 'Mat', premium: false },
  { id: 'glossy', label: 'Parlak', premium: false },
  { id: 'neon', label: 'Neon glow', premium: true },
];

export function cloneAppearance(appearance: DiceAppearance): DiceAppearance {
  return { ...appearance };
}

function luminance(hexColor: string): number {
  const value = hexColor.replace('#', '');
  const red = Number.parseInt(value.slice(0, 2), 16) / 255;
  const green = Number.parseInt(value.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(value.slice(4, 6), 16) / 255;
  const linearize = (channel: number) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  return 0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue);
}

export function getReadablePipColor(bodyColor: string, pipColor: string): string {
  const bodyLuminance = luminance(bodyColor);
  const pipLuminance = luminance(pipColor);
  const contrast =
    (Math.max(bodyLuminance, pipLuminance) + 0.05) / (Math.min(bodyLuminance, pipLuminance) + 0.05);

  if (contrast >= 3) return pipColor;
  return bodyLuminance > 0.5 ? '#101426' : '#FFFFFF';
}
