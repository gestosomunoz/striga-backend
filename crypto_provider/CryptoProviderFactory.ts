import { CryptoProvider } from "./CryptoProvider";
import { StrigaProvider } from "./StrigaProvider";
export class CryptoProviderFactory {
    private static instance: CryptoProvider | null = null;

    public static getCryptoService(): CryptoProvider {
        if (CryptoProviderFactory.instance === null) {
            CryptoProviderFactory.instance = new StrigaProvider();
        }
        return CryptoProviderFactory.instance;
    }
}