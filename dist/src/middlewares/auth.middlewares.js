"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUDOMiddleware = exports.registerMiddleware = exports.loginMiddleware = void 0;
const check_1 = require("express-validator/check");
const User_1 = __importDefault(require("../models/User/User"));
const UserType_1 = __importDefault(require("../models/UserType/UserType"));
const config_1 = __importDefault(require("../models/UserType/config"));
function loginMiddleware(req, res, next) {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    //make sure user exists
    User_1.default.findOne({ username: req.body.username })
        .then(user => {
        if (!user) {
            return res.status(404).json({
                message: 'invalid email or password',
                error: true
            });
        }
    });
}
exports.loginMiddleware = loginMiddleware;
function registerMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = check_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let potentialUser = yield User_1.default.findOne({ username: req.body.username });
        if (potentialUser) {
            return res.status(422).json({
                message: 'user already exists',
                error: true
            });
        }
        next();
    });
}
exports.registerMiddleware = registerMiddleware;
function SUDOMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = check_1.validationResult(req);
        if (!errors.isEmpty()) {
            //çconsole.log(errors.array());
            return res.status(422).json({ errors: errors.array() });
        }
        //check if user is admin
        //he should be logged in so we can get the user from the request
        const user = req.user;
        let isAdmin = false;
        if (user) {
            let userRoles = user.userAccess; //user.userAccess is an array of strings of mongoose object ids
            //check if any of these ids(which correspond to the type) match the admin role
            for (let roleId of userRoles) {
                let role = yield UserType_1.default.findById(roleId);
                if (role.accessRights === config_1.default.admin) {
                    isAdmin = true;
                }
            }
        }
        if (!isAdmin) {
            return res.status(403).json({
                message: 'you are not authorized to perform this action'
            });
        }
        next();
    });
}
exports.SUDOMiddleware = SUDOMiddleware;
//# sourceMappingURL=auth.middlewares.js.map