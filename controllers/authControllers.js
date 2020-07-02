const User = require("../models/user")
const passport = require("../oauth/index")



exports.loginWithEmail = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: "fail", error: "email and password are required" })
    }

    const user = await User.loginWithEmail(email, password);
    if (!user) {
        return res.status(401).json({ status: "fail", error: "wrong email or password" })
    }
    const token = await user.generateToken();

    res.json({ status: "ok", data: { user: user, token: token } })
}


exports.loginFacebook = passport.authenticate("facebook", { scope: ['email'] });

exports.facebookAuthHandler = function (req, res, next) {
    passport.authenticate("facebook", async function (err, profile) {
        // if email exists in database: => login the user and return token
        // else email doesnt exist, we create a new user with such email and then return tghe token as well
        // try {
            const email = profile._json.email
            const name = profile._json.first_name + " " + profile._json.last_name
            const user = await User.findOneOrCreate({ email, name })
            const token = await user.generateToken()
            // if user successfully login => redirect to frontend page
            // return res.redirect(`https://localhost:3000/?token=${token}`)
        // }
        // //if error => redirect to login page again
        // catch (err) {
        //     return res.redirect("https://localhost:3000/login")
        // }

        return res.json({profile})
        
    })(req, res, next);
};
