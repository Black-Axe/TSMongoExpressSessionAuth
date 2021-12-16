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
exports.regularRegister = exports.SUDO_REGISTER = void 0;
const auth_service_1 = require("../services/auth.service");
const convertAcces_1 = __importDefault(require("../utils/convertAcces"));
function SUDO_REGISTER(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, email, accessLevels } = req.body;
        let user;
        if (!accessLevels) {
            user = yield auth_service_1.adminRegistersUser({ username, password, email });
        }
        else {
            user = yield auth_service_1.adminRegistersUser({ username, password, email, accessLevels });
        }
        res.status(200).send(user);
    });
}
exports.SUDO_REGISTER = SUDO_REGISTER;
function regularRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, email } = req.body;
        console.log("received request to register user: ", username, password, email);
        let registered = yield auth_service_1.adminRegistersUser({ username, password, email });
        //login the user
        if (registered.error) {
            res.status(400).send(registered);
        }
        else {
            let returnUser = registered.user;
            // need to login the user as well
            req.login(returnUser, (err) => {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send({
                        message: "User registered successfully",
                        verified: true,
                        user: {
                            username: returnUser.username,
                            email: returnUser.email,
                            accessLevels: convertAcces_1.default(returnUser.userAccess),
                        }
                    });
                }
            });
        }
        ;
    });
}
exports.regularRegister = regularRegister;
//# sourceMappingURL=auth.controller.js.map