// ENV variables
module.exports = {
  env: process.env.ELEVENTY_ENV || 'production',
  isproduction:
    (process.env.ELEVENTY_ENV || 'production') === 'production' ? true : false,
}
