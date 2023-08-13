"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoProviderFactory = void 0;
const StrigaProvider_1 = require("./StrigaProvider");
class CryptoProviderFactory {
    static getCryptoService() {
        if (CryptoProviderFactory.instance === null) {
            CryptoProviderFactory.instance = new StrigaProvider_1.StrigaProvider();
        }
        return CryptoProviderFactory.instance;
    }
}
exports.CryptoProviderFactory = CryptoProviderFactory;
CryptoProviderFactory.instance = null;
