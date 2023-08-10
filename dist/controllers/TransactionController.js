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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const CryptoProviderFactory_1 = require("../crypto_service/CryptoProviderFactory");
class TransactionController {
    constructor() {
        this.cryptoProvider = CryptoProviderFactory_1.CryptoProviderFactory.getCryptoService();
    }
    static getInstance() {
        if (TransactionController.instance === null) {
            TransactionController.instance = new TransactionController();
        }
        return TransactionController.instance;
    }
    topupAccount(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.cryptoProvider.topupAccount(amount);
            return response;
        });
    }
    getTransactionState(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.cryptoProvider.getTransactionState(transactionId);
            return response;
        });
    }
}
exports.TransactionController = TransactionController;
TransactionController.instance = null;
