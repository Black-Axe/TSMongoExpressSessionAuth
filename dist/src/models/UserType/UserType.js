"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("./config"));
const UserTypeSchema = new mongoose_1.Schema({
    accessRights: {
        type: String,
        required: true,
        default: config_1.default.user,
    }
});
const UserType = mongoose_1.model('UserType', UserTypeSchema);
exports.default = UserType;
//# sourceMappingURL=UserType.js.map