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
exports.transactionStateRoute = void 0;
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const striga_adapter_1 = require("../striga-api/striga-adapter");
dotenv_1.default.config();
exports.transactionStateRoute = (0, express_1.Router)();
exports.transactionStateRoute.post('/transaction/:transactionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.transactionId;
    try {
        const state = yield (0, striga_adapter_1.getTransactionState)(transactionId);
        console.log(state);
        res.json(state);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
