module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('@tailwindcss/jit')('./src/_css/tailwind.config.js'),
    require('autoprefixer'),
  ],
}
