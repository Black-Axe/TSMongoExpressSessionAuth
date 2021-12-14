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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../models/UserType/config"));
const UserType_1 = __importDefault(require("../models/UserType/UserType"));
const router = express_1.default.Router();
router.get("/dev/types", (req, res) => {
    console.log(req.body);
    res.send(config_1.default);
});
router.get("/dev/type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let defaultAccessLevel = yield UserType_1.default.findOne({ accessRights: config_1.default.user });
    console.log(defaultAccessLevel);
    res.send(defaultAccessLevel);
}));
exports.default = router;
//# sourceMappingURL=DEV.routes.js.map