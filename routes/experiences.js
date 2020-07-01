const router = require("express").Router({mergeParams: true})
const reviewRouter = require("./review")
const {loginRequired, hostRequired} = require("../middleware/auth")

const {getExperiences, createExperience,deleteExperience,updateExperience} = require("../controllers/experienceController")
router.route("/").get(getExperiences)
.post(loginRequired, hostRequired, createExperience)



router.route("/:eid").delete(loginRequired,hostRequired,deleteExperience)
.patch(loginRequired,hostRequired,updateExperience)

router.use("/:eid/reviews", reviewRouter)

// router.use("/:rid")
module.exports = router 