import { CryptoProvider } from "../crypto_service/CryptoProvider";
import { CryptoProviderFactory } from "../crypto_service/CryptoProviderFactory";

export class TransactionController {
    private static instance: TransactionController | null = null;
    private cryptoProvider: CryptoProvider;

    private constructor() {
        this.cryptoProvider = CryptoProviderFactory.getCryptoService();
    }

    public static getInstance(): TransactionController {
        if (TransactionController.instance === null) {
            TransactionController.instance = new TransactionController();
        }
        return TransactionController.instance;
    }

    public async topupAccount(amount: number): Promise<any> {
        const response = await this.cryptoProvider.topupAccount(amount);
        return response;
    }

    public async getTransactionState(transactionId: string): Promise<any> {
        const response = await this.cryptoProvider.getTransactionState(transactionId);
        return response;
    }

}