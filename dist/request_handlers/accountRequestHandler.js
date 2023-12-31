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
exports.accountRequestHandler = void 0;
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const AccountController_1 = __importDefault(require("../controllers/AccountController"));
dotenv_1.default.config();
exports.accountRequestHandler = (0, express_1.Router)();
exports.accountRequestHandler.get('/balance', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const balance = yield AccountController_1.default.getCurrentBalance();
        res.json(balance);
    }
    catch (error) {
        next(error);
    }
}));
