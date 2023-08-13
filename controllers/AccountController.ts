import { CryptoProvider } from "../crypto_service/CryptoProvider";
import { CryptoProviderFactory } from "../crypto_service/CryptoProviderFactory";

class AccountController {
    private cryptoProvider: CryptoProvider;
    public constructor() {
        this.cryptoProvider = CryptoProviderFactory.getCryptoService();
    }
    
    public async getCurrentBalance(): Promise<any> {
        
        const balance = await this.cryptoProvider.getAccountBalance();
        return balance;
    }
}

const accountController: AccountController = new AccountController();

export default accountController;