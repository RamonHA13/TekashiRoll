/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {

        'main-color': '#FBBF24',
        'second-color': '#9A3412',
        'third-color': '#F59E0B',
        'fourth-color': '#ec815c'
      }
    }
  },
  plugins: []
}
