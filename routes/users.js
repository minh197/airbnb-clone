var express = require('express');
var router = express.Router();
const {createUser,getMyProfile} = require('../controllers/userController')
const {loginRequired} = require('../middleware/auth')


 

router.route("/").get(function(req, res, next) {
  res.send('respond with a resource');
})
.post(createUser)


//localhost:5000/users/me => all current user information

router.route("/me").get(loginRequired,getMyProfile)

module.exports = router;
