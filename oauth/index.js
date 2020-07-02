const passport =  require('passport');
const facebookStrat = require("./facebook")
// const google = require("./google")



passport.use(facebookStrat)
// passport.use(google)


module.exports = passport