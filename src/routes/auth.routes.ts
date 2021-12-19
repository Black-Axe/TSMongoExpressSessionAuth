import express from "express";
import passport from "passport";
import connectEnsureLogin from "connect-ensure-login";
import {SUDO_REGISTER, regularRegister, resetPassword, verifyResetToken} from "../controllers/auth.controller";
import {SUDOMiddleware, registerMiddleware, resetPassMiddleWare} from "../middlewares/auth.middlewares";
import { registrationValidation,SUDOOptionalUserAccessLevel, resetPassValidation } from "../middlewares/validators/validators";



const router = express.Router();

// @route   POST /sudoregister
// @desc    Sudo register
// @access  Private
// admin only access for creating new users where that user can be an admin or any other regular user
// difference is that sudo register accepts user access levels as params {admin, user, banned, moderator}
// flow goes like this:
// 1. user sends a request to /sudoregister
// 2. server checks if the user is logged in
// 3. if user is logged in, server checks if the user is an admin
// 4. if user is an admin, server checks if params are valid
// 5. if params are valid, server creates a new user with the given params

router.post("/sudoregister", 
    connectEnsureLogin.ensureLoggedIn("/loginerror"),
    registrationValidation,
    SUDOOptionalUserAccessLevel,
    SUDOMiddleware,
    SUDO_REGISTER);

router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/error",
    failureFlash: true
}
));

router.post("/register", registrationValidation, registerMiddleware, regularRegister);

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/logoutsuccess");
})

router.get("/logoutsuccess", function(req, res) {
    res.status(200).send({
        message: "You have been logged out"
    });
})

router.post("/resetPassword", resetPassValidation, resetPassMiddleWare, resetPassword);



//this is what our frontend client will use to call the server and get the user to change their password
router.get("/verifyResetToken/:resetToken", verifyResetToken);

export default router;