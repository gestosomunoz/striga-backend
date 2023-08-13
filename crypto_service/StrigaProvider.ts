import axios from "axios";
import { CryptoProvider } from "./CryptoProvider";
import { ExchangeRatesResponse, TopupResponse, TransactionStateResponse } from "./apiResponseTypes";
import crypto from 'crypto'

export class StrigaProvider implements CryptoProvider {
    private baseUrl: string = 'https://www.sandbox.striga.com/api/v1';

    private getAuthHeader(body: any, path: string, method: string): string {
        const hmac = crypto.createHmac('sha256', process.env.API_SECRET!);
        const time = Date.now().toString();
      
        hmac.update(time);
        hmac.update(method);
        hmac.update(path);
      
        const contentHash = crypto.createHash('md5');
        contentHash.update(JSON.stringify(body));
      
        hmac.update(contentHash.digest('hex'));
        return `HMAC ${time}:${hmac.digest('hex')}`
    }

    private async callApi(path: string, body: any, method: string) {
        const url = this.baseUrl + path;
        const authorization = this.getAuthHeader(body, path, method);
        let config = {
            method: method,
            url: url,
            headers: {
                Authorization: authorization,
                'api-key': process.env.API_KEY,
            },
            data : body
         };
        const response = await axios(config);
        return response.data;
    }

    public async getExchangeRates(): Promise<ExchangeRatesResponse> {
        const apiResponse = await this.callApi('/trade/rates', {}, 'POST');
        return apiResponse;

    }
    
    public async topupAccount(amount: number): Promise<TopupResponse> {
        const userId = process.env.USER_ID!;
        const accountId = process.env.ACCOUNT_ID!;
        const satoshis = Math.floor(100000000 * amount);
        const body = {
            userId: userId,
            accountId: accountId,
            amount: satoshis.toString(),
            ttl: 10
        }
        const response = await this.callApi('/wallets/account/lightning/topup', body, 'POST');
        return {
            transactionId: response.id,
            invoice: response.invoice,
            expiry: response.expiry
        }

    }

    public async getTransactionState(transactionId: string): Promise<TransactionStateResponse> {
        const userId = process.env.USER_ID!;
        const accountId = process.env.ACCOUNT_ID!;
        const body = {
            userId: userId,
            accountId: accountId,
            txId: transactionId
        } 
        const response = await this.callApi('/wallets/account/get-transactions-by-id', body, 'POST');
        if (response && response.transactions && response.count > 0) {
            const transaction = response.transactions[0];
            if (transaction.txType === 'LN_INCOMING_CONFIRMED') {
                return { transactionState: 'PAID'}
            }
            if (transaction.txType === 'LN_INCOMING_EXPIRED') {
                return { transactionState: 'EXPIRED'}
            }
        }
        return { transactionState: 'OPEN'}
    }
}