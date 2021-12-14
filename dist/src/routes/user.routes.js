"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const connect_ensure_login_1 = __importDefault(require("connect-ensure-login"));
const router = express_1.default.Router();
// @route   GET /profile
// @desc    Get user profile
// @access  Private
//middleware handles validating the user exists and is logged in
router.get('/profile', connect_ensure_login_1.default.ensureLoggedIn("/loginerror"), user_controller_1.userProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map