/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4A60A1',
        'secondary': '#FF6B6B',
        'success': '#2ecc71',
        'warning': '#f39c12',
        'background': '#f8f9fa',
        'text': '#333333',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}