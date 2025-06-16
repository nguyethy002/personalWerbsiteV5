module.exports = {
  prefix: "",
  important: false,
  separator: ":",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      keyframes: {
        loading: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        }
      },
      animation: {
        'loading': 'loading 1.5s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,sass,scss}',
  ],
};
