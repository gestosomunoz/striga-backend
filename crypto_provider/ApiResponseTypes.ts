
export interface CurrencyExchange {
    price: string,
    buy: string,
    sell: string,
    timestamp: number,
    currency: string
}

export interface ExchangeRatesResponse  {
    [key: string]: CurrencyExchange;
}

export interface TopupResponse {
    transactionId: string,
    invoice: string,
    expiry: number;
}
export type TransactionState = "PAID" | "OPEN" | "EXPIRED";
export interface TransactionStateResponse {
    transactionState: TransactionState
}

export interface AccountBalanceResponse {
    balance: number;
}