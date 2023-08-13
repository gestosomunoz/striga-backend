import { CryptoProvider } from "../crypto_service/CryptoProvider";
import { CryptoProviderFactory } from "../crypto_service/CryptoProviderFactory";

class TransactionController {
    private cryptoProvider: CryptoProvider;

    public constructor() {
        this.cryptoProvider = CryptoProviderFactory.getCryptoService();
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

const transactionController: TransactionController = new TransactionController();

export default transactionController;