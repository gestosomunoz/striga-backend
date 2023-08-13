import { CryptoProvider } from "../crypto_provider/CryptoProvider";
import { CryptoProviderFactory } from "../crypto_provider/CryptoProviderFactory";
import { AppError } from "../errors/AppError";

class TradeController {
    private cryptoProvider: CryptoProvider;
    public constructor() {
        this.cryptoProvider = CryptoProviderFactory.getCryptoService();
    }
    
    public async getExchangeRates(currency: string): Promise<any> {
        const rates = await this.cryptoProvider.getExchangeRates();
        if (!rates[currency]) {
            throw new AppError(404, `Exchange rate for ${currency} not found`);
        }
        return rates[currency];
}
    
}

const tradeController: TradeController = new TradeController();

export default tradeController;