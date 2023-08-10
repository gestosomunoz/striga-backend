import { CryptoProvider } from "../crypto_service/CryptoProvider";
import { CryptoProviderFactory } from "../crypto_service/CryptoProviderFactory";

export class TradeController {
    private static instance: TradeController | null = null;
    private cryptoProvider: CryptoProvider;
    private constructor() {
        // Private constructor to prevent direct instantiation
        this.cryptoProvider = CryptoProviderFactory.getCryptoService();
    }

    public static getInstance(): TradeController {
        if (TradeController.instance === null) {
            TradeController.instance = new TradeController();
        }
        return TradeController.instance;
    }
    
    public async getExchangeRates(currency: string): Promise<any> {
        
        const rates = await this.cryptoProvider.getExchangeRates();
        return rates[currency];
    }
}