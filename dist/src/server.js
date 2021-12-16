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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = express_1.default();
initAndFill_1.default();
const whiteList = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(',') : [];
/*
If you want to allow specific domains to access your API, you can use the following code:
const corsOptions: cors.CorsOptions = {
      origin: function (origin, callback) {
            console.log(origin + " is making rquest");
            if (whiteList.indexOf(origin) !== -1) {
                  callback(null, true);
            } else {
                  callback(new Error('Not allowed by CORS'));
            }
      },
      credentials: true,
      optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
*/
app.use(cors_1.default({
    origin: function (origin, callback) {
        //console.log(origin + " is making rquest");
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 9010);
passport_sessions_config_1.default(app);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
router_1.default(app);
app.listen(app.get('port'), () => {
    console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=server.js.map