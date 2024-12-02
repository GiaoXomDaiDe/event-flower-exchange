/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}' // Đảm bảo Tailwind áp dụng cho toàn bộ dự án
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffe6e6',
          100: '#ffd7d7',
          200: '#ffc5c5',
          300: '#ffa8a8',
          400: '#ff8c9d',
          500: '#ff6d7e',
          600: '#ff4f63',
          700: '#ff3a5a',
          800: '#ff2d4d',
          900: '#ff1b3e'
        }
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(285deg, #FF9A8B 5.39%, #FC6181 50%, #FF99AC 94.61%)'
      },
      fontFamily: {
        sans: ['sans-serif'],
        beausite: ['Beausite Classic Trial', 'sans-serif'],
        seventies: ['VNSeventies', 'sans-serif']
      },
      fontWeight: {
        thin: '100',
        extraLight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
        extraBold: '800',
        black: '900'
      }
    }
  },
  plugins: []
}
