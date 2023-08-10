import { ExchangeRatesResponse, TopupResponse, TransactionStateResponse } from "./apiResponseTypes";

export interface CryptoProvider {
    getExchangeRates(): Promise<ExchangeRatesResponse>;
    topupAccount(amount: number): Promise<TopupResponse>;
    getTransactionState(transactionId: string): Promise<TransactionStateResponse>;
}