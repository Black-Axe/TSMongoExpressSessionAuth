"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUDOOptionalUserAccessLevel = exports.loginValidation = exports.registrationValidation = void 0;
const check_1 = require("express-validator/check");
exports.registrationValidation = [
    check_1.check("email", "email is required").not().isEmpty().isEmail().withMessage("email is invalid"),
    check_1.check("password", "password is required").not().isEmpty().isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
    check_1.check("confirmPassword", "password confirmation is required").not().isEmpty().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    check_1.check("username", "username is required").not().isEmpty().isLength({ min: 3 }).withMessage("username must be at least 3 characters long"),
];
exports.loginValidation = [
    check_1.check("username", "username is required").not().isEmpty(),
    check_1.check("password", "password is required").not().isEmpty(),
];
exports.SUDOOptionalUserAccessLevel = [
    check_1.check("accessLevels", "accessLevels must be an array containing either admin, user, moderator, or banned").optional().isArray().custom((value, { req }) => {
        if (value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== "admin" && value[i] !== "user" && value[i] !== "moderator" && value[i] !== "banned") {
                    throw new Error("accessLevels must be an array containing either admin, user, moderator, or banned");
                }
            }
        }
        return true;
    }),
];
//# sourceMappingURL=validators.js.map