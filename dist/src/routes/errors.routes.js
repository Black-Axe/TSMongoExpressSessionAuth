"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/loginerror", (req, res) => {
    res.status(418).send({
        message: "I'm a teapot",
        error: "You must be logged in to access this page"
    });
});
router.get("/error", (req, res) => {
    res.status(418).send({
        message: "I'm a teapot",
        error: req.flash("error")
    });
});
router.get("/unauthorized", (req, res) => {
    res.status(401).send({
        message: "Unauthorized",
    });
});
router.get("/404", (req, res) => {
    res.status(404).send({
        message: "Not Found",
    });
});
exports.default = router;
//# sourceMappingURL=errors.routes.js.map