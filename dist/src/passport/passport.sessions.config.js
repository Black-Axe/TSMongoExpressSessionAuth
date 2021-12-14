"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const User_1 = __importDefault(require("../models/User/User"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const defaults_1 = __importDefault(require("../../config/defaults"));
const connect_flash_1 = __importDefault(require("connect-flash"));
let uri = defaults_1.default.mongoURI;
function initPassportAndSessions(app) {
    app.use(express_session_1.default({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: {},
        name: "sessionName",
        store: connect_mongo_1.default.create({
            mongoUrl: uri,
        })
    }));
    app.use(connect_flash_1.default());
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    passport_1.default.use(new passport_local_1.Strategy(User_1.default.authenticate()));
    passport_1.default.serializeUser(User_1.default.serializeUser());
    passport_1.default.deserializeUser(User_1.default.deserializeUser());
    console.log("passport and sessions loaded");
}
exports.default = initPassportAndSessions;
//# sourceMappingURL=passport.sessions.config.js.map