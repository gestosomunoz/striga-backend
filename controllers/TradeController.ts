import { CryptoProvider } from "../crypto_service/CryptoProvider";
import { CryptoProviderFactory } from "../crypto_service/CryptoProviderFactory";

export class TradeController {
    private static instance: TradeController | null = null;

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public static getInstance(): TradeController {
        if (TradeController.instance === null) {
            TradeController.instance = new TradeController();
        }
        return TradeController.instance;
    }
    
    public async getExchangeRates(currency: string): Promise<any> {
        const cryptoProvider = CryptoProviderFactory.getCryptoService();
        const rates = await cryptoProvider.getExchangeRates();
        return rates[currency];
    }
}