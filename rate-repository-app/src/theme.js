import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#CA3CFF',
    appBarBg: '#21fa90',
    error: '#EA1744',
  },
  fontSizes: {
    body: 16,
    subheading: 20,
    heading: 26,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
