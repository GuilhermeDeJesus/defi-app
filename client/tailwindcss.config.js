module.exports = {
    content: [
      './src/**/*.{html,js,ts,jsx,tsx}',
      './public/index.html'
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3B82F6',
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography')
    ],
  }
  