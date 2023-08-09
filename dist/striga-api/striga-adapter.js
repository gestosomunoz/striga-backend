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
exports.getExchangeRates = void 0;
const axios_1 = __importDefault(require("axios"));
const strigaUtils_1 = require("./strigaUtils");
const baseUrl = 'https://www.sandbox.striga.com/api/v1';
function callApi(path, body, method) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = baseUrl + path;
        const authorization = (0, strigaUtils_1.getAuthHeaderv2)(body, path, method);
        let config = {
            method: method,
            url: url,
            headers: {
                Authorization: authorization,
                'api-key': process.env.API_KEY,
            },
            data: body
        };
        const response = yield (0, axios_1.default)(config);
        return response.data;
    });
}
function getExchangeRates() {
    return __awaiter(this, void 0, void 0, function* () {
        return callApi('/trade/rates', {}, 'POST');
    });
}
exports.getExchangeRates = getExchangeRates;
