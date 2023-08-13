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
exports.transactionRequestHandler = void 0;
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const TransactionController_1 = __importDefault(require("../controllers/TransactionController"));
dotenv_1.default.config();
exports.transactionRequestHandler = (0, express_1.Router)();
exports.transactionRequestHandler.post('/topup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.hasOwnProperty('amount')) {
            return res.status(400).json({ error: 'Missing amount in request body' });
        }
        const amount = req.body.amount;
        const topup = yield TransactionController_1.default.topupAccount(amount);
        res.json(topup);
    }
    catch (error) {
        next(error);
    }
}));
exports.transactionRequestHandler.post('/:transactionId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.params.transactionId;
        const state = yield TransactionController_1.default.getTransactionState(transactionId);
        res.json(state);
    }
    catch (error) {
        next(error);
    }
}));
