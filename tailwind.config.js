/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 20px 35px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}

