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
exports.adminRegistersUser = void 0;
const User_1 = __importDefault(require("../models/User/User"));
const config_1 = __importDefault(require("../models/UserType/config"));
const UserType_1 = __importDefault(require("../models/UserType/UserType"));
const generateAvatar_1 = __importDefault(require("../utils/generateAvatar"));
//this will be used to create a new user by the admin
//we include the access levels for the function that the admin will assign for the user
//there will be another function that a regular user will use to register 
//where they will be assigned the access level of the user
exports.adminRegistersUser = 
//middlewares will check for admin access level
({ email, password, username, accessLevels }) => __awaiter(void 0, void 0, void 0, function* () {
    let newUsersAccessLevels = [];
    let firstUser = false;
    //check if the user already exists
    console.log("properties provided for registration", email, password, username, accessLevels);
    //check if user exists by email or username
    const user = yield User_1.default.findOne({ $or: [{ email: email }, { username: username }] });
    if (user) {
        return {
            message: "User already exists",
            error: true,
            user: null
        };
    }
    ;
    //if there are no users in the database, default first user to be admin
    const count = yield User_1.default.countDocuments({});
    if (count === 0) {
        firstUser = true;
    }
    ;
    //accessLevels will be an array of strings
    //we will convert the strings to the access level object  
    if (!accessLevels || accessLevels.length === 0) {
        console.log("no access levels provided defaulting to user");
        //if the accessLevels is not provided we will assign the user to the default access level
        let defaultAccessLevel = yield UserType_1.default.findOne({ accessRights: config_1.default.user });
        newUsersAccessLevels.push(defaultAccessLevel._id);
    }
    else {
        //if the accessLevels is provided we will convert the strings to the access level object
        for (let accessRight of accessLevels) {
            console.log(accessRight + "access right sent in");
            let accessLevel = yield UserType_1.default.findOne({ accessRights: accessRight });
            console.log("access level found is " + accessLevel);
            newUsersAccessLevels.push(accessLevel._id);
            console.log("access level pushed to array where array is " + newUsersAccessLevels);
        }
    }
    if (firstUser) {
        console.log("first user is being created");
        //if the user is the first user in the database, we will assign them the admin access level
        let adminAccessLevel = yield UserType_1.default.findOne({ accessRights: config_1.default.admin });
        newUsersAccessLevels.push(adminAccessLevel._id);
    }
    //mongoose-local-passport will hash the password and handle it when we register the user
    //generate avatar
    let avatar = generateAvatar_1.default();
    //create a new user
    const newUser = new User_1.default({
        email,
        username,
        userAccess: newUsersAccessLevels,
        avatar
    });
    //register the user
    let registeredUser = yield User_1.default.register(newUser, password);
    let regobj = {
        email: registeredUser.email,
        username: registeredUser.username,
        userAccess: registeredUser.userAccess,
    };
    console.log("user registered");
    console.log(regobj);
    if (registeredUser) {
        return {
            message: "User registered",
            error: false,
            user: registeredUser
        };
    }
    else {
        return {
            message: "error registering user",
            error: true,
            user: null
        };
    }
});
//# sourceMappingURL=auth.service.js.map