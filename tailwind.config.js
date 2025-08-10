/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: '#1DB954',
        'mood-happy': '#FFD700',
        'mood-sad': '#4682B4',
        'mood-energetic': '#FF6347',
        'mood-chill': '#98FB98',
        'mood-focus': '#9370DB',
        'mood-party': '#FF1493',
      }
    },
  },
  plugins: [],
}
