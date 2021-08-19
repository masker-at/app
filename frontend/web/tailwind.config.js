module.exports = {
  purge: ['src/**/*'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'no-offset': '0px 0px 8px 0px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        primary: '#62bea8',
        'primary-darker': '#227e68',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['focus'],
      margin: ['focus'],
      backgroundColor: ['active', 'disabled'],
      cursor: ['disabled'],
      fontWeight: ['hover'],
    },
  },
  plugins: [],
}
