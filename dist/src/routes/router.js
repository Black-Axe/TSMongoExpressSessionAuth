"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const errors_routes_1 = __importDefault(require("./errors.routes"));
const DEV_routes_1 = __importDefault(require("./DEV.routes"));
function initRouter(app) {
    app.use("/", auth_routes_1.default);
    app.use("/", user_routes_1.default);
    app.use("/", errors_routes_1.default);
    if (process.env.NODE_ENV === "development") {
        app.use("/", DEV_routes_1.default);
    }
}
exports.default = initRouter;
//# sourceMappingURL=router.js.map