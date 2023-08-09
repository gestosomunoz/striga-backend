"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthHeaderv2 = void 0;
const crypto_1 = __importDefault(require("crypto"));
function getAuthHeaderv2(body, path, method) {
    const hmac = crypto_1.default.createHmac('sha256', process.env.API_SECRET);
    const time = Date.now().toString();
    hmac.update(time);
    hmac.update(method);
    hmac.update(path);
    const contentHash = crypto_1.default.createHash('md5');
    contentHash.update(JSON.stringify(body));
    hmac.update(contentHash.digest('hex'));
    return `HMAC ${time}:${hmac.digest('hex')}`;
}
exports.getAuthHeaderv2 = getAuthHeaderv2;
