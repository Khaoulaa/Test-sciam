/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      maxHeight: {
        'list': 'calc(100vh - 290px)'
      }
    },
    backgroundColor: theme => theme('colors'),
    backgroundColor: {
      'violet': '#8313CE',
      'pink': `#C40FCD`,
      'green': `#11CC65`,
      'orange': `#C74A10`,
      'yellow': `#FFC72B`,
      'grey-light': 'rgb(203 213 225)'
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
}
