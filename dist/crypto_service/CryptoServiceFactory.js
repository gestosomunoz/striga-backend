"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoServiceFactory = void 0;
const StrigaService_1 = require("./StrigaService");
class CryptoServiceFactory {
    static getCryptoService() {
        if (CryptoServiceFactory.instance === null) {
            CryptoServiceFactory.instance = new StrigaService_1.StrigaService();
        }
        return CryptoServiceFactory.instance;
    }
}
exports.CryptoServiceFactory = CryptoServiceFactory;
