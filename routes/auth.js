var express = require('express');
var router = express.Router();
const {loginWithEmail,loginFacebook,facebookAuthHandler} = require("../controllers/authControllers")


const {loginRequired} = require("../middleware/auth")

 //localhost:5000/auth/

 router.route("/login").post(loginWithEmail)

router.route("/facebook/login").get(loginFacebook)
router.route("facebook/authorized").get(facebookAuthHandler)
module.exports = router;
