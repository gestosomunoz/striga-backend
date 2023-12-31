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
const CryptoProviderFactory_1 = require("../crypto_provider/CryptoProviderFactory");
const AppError_1 = require("../errors/AppError");
class TradeController {
    constructor() {
        this.cryptoProvider = CryptoProviderFactory_1.CryptoProviderFactory.getCryptoService();
    }
    getExchangeRates(currency) {
        return __awaiter(this, void 0, void 0, function* () {
            const rates = yield this.cryptoProvider.getExchangeRates();
            if (!rates[currency]) {
                throw new AppError_1.AppError(404, `Exchange rate for ${currency} not found`);
            }
            return rates[currency];
        });
    }
}
const tradeController = new TradeController();
exports.default = tradeController;
