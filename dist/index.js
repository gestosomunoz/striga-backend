"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const defaultRoute_1 = require("./routes/defaultRoute");
const body_parser_1 = __importDefault(require("body-parser"));
const pingRoute_1 = require("./routes/pingRoute");
const getExchangeRoute_1 = require("./routes/getExchangeRoute");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.router = express_1.default.Router();
const port = process.env.PORT;
exports.router.use(defaultRoute_1.defaultRoute);
exports.router.use(pingRoute_1.pingRoute);
exports.router.use(getExchangeRoute_1.getExchangeRoute);
app.use((0, cors_1.default)());
app.use('/', exports.router);
app.use(body_parser_1.default.json({ limit: '50mb', type: 'application/json' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.listen(port, () => {
    console.log(`[server]: Serverr is running at http://localhost:${port}`);
});
