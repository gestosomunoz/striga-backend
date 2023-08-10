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
exports.pingRoute = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const strigaUtils_1 = require("../striga-api/strigaUtils");
dotenv_1.default.config();
exports.pingRoute = (0, express_1.Router)();
exports.pingRoute.get('/ping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            ping: 'pouung'
        };
        const authorization = (0, strigaUtils_1.getAuthHeaderv2)(data, '/ping', 'POST');
        const headers = {
            Authorization: authorization,
            'api-key': process.env.API_KEY,
        };
        const apiUrl = 'https://www.sandbox.striga.com/api/v1/ping';
        const response = yield axios_1.default.post(apiUrl, data, { headers });
        res.json(response.data); // Send the response data from the external API to the client
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' }); // Handle errors appropriately
    }
}));
