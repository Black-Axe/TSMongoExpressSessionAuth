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
exports.DBPopulate = void 0;
const UserType_1 = __importDefault(require("../models/UserType/UserType"));
const config_1 = __importDefault(require("../models/UserType/config"));
function isPopulated() {
    return __awaiter(this, void 0, void 0, function* () {
        const userTypes = yield UserType_1.default.find();
        if (userTypes.length === 0) {
            return false;
        }
        return true;
    });
}
function DBPopulate() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Attempting to populate database with user types...");
        const populated = yield isPopulated();
        if (!populated) {
            console.log("Populating database with user types...");
            for (let type in config_1.default) {
                const newType = new UserType_1.default({
                    accessRights: type
                });
                yield newType.save();
            }
            console.log("Database populated with user types.");
        }
        else {
            console.log("Database already populated with user types. - Skipping.");
        }
    });
}
exports.DBPopulate = DBPopulate;
//# sourceMappingURL=Populate.js.map