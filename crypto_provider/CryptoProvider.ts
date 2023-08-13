import { AccountBalanceResponse, ExchangeRatesResponse, TopupResponse, TransactionStateResponse } from "./ApiResponseTypes";

export interface CryptoProvider {
    getExchangeRates(): Promise<ExchangeRatesResponse>;
    topupAccount(amount: number): Promise<TopupResponse>;
    getTransactionState(transactionId: string): Promise<TransactionStateResponse>;
    getAccountBalance(): Promise<AccountBalanceResponse>
}