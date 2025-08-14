export const lightTheme = {
  palette: {
    mode: 'light',
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
    primary: {
      main: '#4A90E2',
      dark: '#357ABD',
      light: '#6FA4E8',
    },
    secondary: {
      main: '#9B59B6',
      dark: '#7D3C98',
      light: '#B574C4',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
      card: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#546E7A',
      disabled: '#9E9E9E',
    },
    success: { main: '#27AE60' },
    warning: { main: '#F39C12' },
    error: { main: '#E74C3C' },
    info: { main: '#3498DB' },
  },
  spacing: 8,
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    h3: { fontWeight: 600, fontSize: '1.5rem' },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.43 },
  },
  shape: { borderRadius: 12 },
  shadows: {
    card: '0 4px 16px rgba(0,0,0,0.1)',
    button: '0 2px 8px rgba(0,0,0,0.15)',
    modal: '0 8px 32px rgba(0,0,0,0.3)',
  },
};

export const darkTheme = {
  palette: {
    mode: 'dark',
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
    primary: {
      main: '#BB86FC',
      dark: '#985EFF',
      light: '#D2A6FF',
    },
    secondary: {
      main: '#03DAC6',
      dark: '#00C4A7',
      light: '#66FFF6',
    },
    background: {
      default: '#0D1117',
      paper: '#161B22',
      card: '#21262D',
    },
    text: {
      primary: '#F0F6FC',
      secondary: '#8B949E',
      disabled: '#6B7280',
    },
    success: { main: '#238636' },
    warning: { main: '#D29922' },
    error: { main: '#F85149' },
    info: { main: '#58A6FF' },
  },
  spacing: 8,
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    h3: { fontWeight: 600, fontSize: '1.5rem' },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.43 },
  },
  shape: { borderRadius: 12 },
  shadows: {
    card: '0 4px 16px rgba(0,0,0,0.4)',
    button: '0 2px 8px rgba(0,0,0,0.3)',
    modal: '0 8px 32px rgba(0,0,0,0.6)',
  },
};