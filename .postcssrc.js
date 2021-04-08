module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('tailwindcss')('./src/_css/tailwind.config.js'),
    require('autoprefixer'),
  ],
}
