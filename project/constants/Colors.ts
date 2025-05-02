const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// Futuristic neon color palette
export const neonColors = {
  primary: '#0078FF',
  primaryDark: '#0050C9',
  primaryLight: '#40A0FF',
  secondary: '#5E17EB',
  secondaryDark: '#4A00E0',
  secondaryLight: '#7B47F5',
  accent: '#FF0099',
  accentDark: '#D10080',
  accentLight: '#FF40BB',
  success: '#00E676',
  warning: '#FFEA00',
  error: '#FF3D71',
  background: '#080A1A',
  backgroundLight: '#101232',
  surface: '#141A46',
  surfaceLight: '#202A66',
  text: '#FFFFFF',
  textSecondary: '#9DA4BD',
  border: '#252B4D',
  hologram: 'rgba(0, 178, 255, 0.15)',
};

export default {
  light: {
    text: '#000',
    textSecondary: '#666',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: neonColors.text,
    textSecondary: neonColors.textSecondary,
    background: neonColors.background,
    tint: neonColors.primary,
    tabIconDefault: '#888',
    tabIconSelected: neonColors.primary,
  },
};