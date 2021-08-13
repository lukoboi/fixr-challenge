module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'fixr-red': {
          DEFAULT: '#CC003E',
          dark: '#A50233',
        },
        'fixr-green': {
          DEFAULT: '#48C674',
          dark: '#2CAC59',
        },
        'fixr-blue': {
          light: '#299DF4',
          DEFAULT: '#299DF4',
          dark: '#0E6FB5',
        },
        'fixr-grey': {
          DEFAULT: '#273142',
          light: '#F5F5F5',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
