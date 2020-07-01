const router = require("express").Router({mergeParams:true});
const {getReviews,createReview,deleteReview} = require("../controllers/reviewController")
const {loginRequired} = require("../middleware/auth")




router.route("/")
.get(getReviews)
.post(loginRequired,createReview)


router.route("/:rid")
.patch(loginRequired,createReview)
.delete(loginRequired,deleteReview)



module.exports = router