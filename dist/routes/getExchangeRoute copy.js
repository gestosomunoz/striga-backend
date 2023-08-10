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
exports.getExchangeRoute = void 0;
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const striga_adapter_1 = require("../striga-api/striga-adapter");
dotenv_1.default.config();
exports.getExchangeRoute = (0, express_1.Router)();
exports.getExchangeRoute.get('/trade/exchange/:currency', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currency = req.params.currency;
    const rates = yield (0, striga_adapter_1.getExchangeRates)();
    const topup = (0, striga_adapter_1.topupAccount)();
    //console.log(topup);
    topup
        .then((data) => console.log(data))
        .catch((err) => {
        //console.log("ERROR LUIS");
        console.error(err);
    });
    res.json(rates[currency]); // Send the response data from the external API to the client
}));
