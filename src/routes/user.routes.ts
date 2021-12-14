import express from "express";
import {userProfile} from '../controllers/user.controller';
import connectEnsureLogin from "connect-ensure-login";
import { loginMiddleware } from "../middlewares/auth.middlewares";
import { loginValidation } from "../middlewares/validators/validators";

const router = express.Router();


// @route   GET /profile
// @desc    Get user profile
// @access  Private
//middleware handles validating the user exists and is logged in
router.get('/profile', connectEnsureLogin.ensureLoggedIn("/loginerror"), userProfile);

export default router;