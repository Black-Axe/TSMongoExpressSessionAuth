"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const initAndFill_1 = __importDefault(require("./database/initAndFill"));
const passport_sessions_config_1 = __importDefault(require("./passport/passport.sessions.config"));
const router_1 = __importDefault(require("./routes/router"));
const app = express_1.default();
initAndFill_1.default();
var cors = require('cors');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 9010);
passport_sessions_config_1.default(app);
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
router_1.default(app);
app.listen(app.get('port'), () => {
    console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=server.js.map