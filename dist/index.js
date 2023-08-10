"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const tradeRequestHandler_1 = require("./request_handlers/tradeRequestHandler");
const cors_1 = __importDefault(require("cors"));
const transactionRequestHandler_1 = require("./request_handlers/transactionRequestHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb', type: 'application/json' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
router.use('/trade', tradeRequestHandler_1.tradeRequestHandler);
router.use('/transaction', transactionRequestHandler_1.transactionRequestHandler);
app.use('/', router);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
