const darkColors = {
  gray0: '#ECECEC',
  gray1: '#C6C6C6',
  gray2: '#A0A0A0',
  gray3: '#4B4B4B',
  gray4: '#2E2E2E',
  gray5: '#121212',
  primary: '#FCD400',
  secondary: '#FFF4E0',
  secondaryButtonText: '#ff7a2a',
  destructive: 'red',
  background: '#FFFFFF',
}

const lightColors = {
  gray0: '#ECECEC',
  gray1: '#C6C6C6',
  gray2: '#A0A0A0',
  gray3: '#4B4B4B',
  gray4: '#2E2E2E',
  gray5: '#121212',
  primary: '#FCD400',
  secondary: '#FFF4E0',
  secondaryButtonText: '#ff7a2a',
  destructive: 'red',
  background: '#FFFFFF',
}

export const dark = {
  color: darkColors,
}

export const light = {
  color: lightColors,
}

export const theme = {
  dark,
  light,
}

export type Theme = typeof theme
