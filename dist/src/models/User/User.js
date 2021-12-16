"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    userAccess: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "UserType",
            required: true,
        },
    ],
    avatar: {
        type: String,
    },
});
UserSchema.plugin(passport_local_mongoose_1.default);
const User = mongoose_1.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map