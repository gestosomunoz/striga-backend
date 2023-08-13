import { CryptoProvider } from "../crypto_service/CryptoProvider";
import { CryptoProviderFactory } from "../crypto_service/CryptoProviderFactory";

class TradeController {
    private cryptoProvider: CryptoProvider;
    public constructor() {
        this.cryptoProvider = CryptoProviderFactory.getCryptoService();
    }
    
    public async getExchangeRates(currency: string): Promise<any> {
        
        const rates = await this.cryptoProvider.getExchangeRates();
        return rates[currency];
    }
}

const tradeController: TradeController = new TradeController();

export default tradeController;