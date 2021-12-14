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
Object.defineProperty(exports, "__esModule", { value: true });
exports.regularRegister = exports.SUDO_REGISTER = void 0;
const auth_service_1 = require("../services/auth.service");
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
        let user = yield auth_service_1.adminRegistersUser({ username, password, email });
        console.log(user + "as registereted returned from regular register");
        res.status(200).send(user);
    });
}
exports.regularRegister = regularRegister;
//# sourceMappingURL=auth.controller.js.map