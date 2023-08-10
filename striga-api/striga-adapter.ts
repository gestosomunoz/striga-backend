import axios from "axios";
import { getAuthHeaderv2 } from "./strigaUtils";

const baseUrl = 'https://www.sandbox.striga.com/api/v1';

async function callApi(path: string, body: any, method: string) {
    const url = baseUrl + path;
    const authorization = getAuthHeaderv2(body, path, method);
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

export async function getExchangeRates(): Promise<any> {
    return callApi('/trade/rates', {}, 'POST');
}

export async function topupAccount(amount: number) {
    const userId = process.env.USER_ID!;
    const accountId = process.env.ACCOUNT_ID!;
    const satoshis = Math.floor(100000000 * amount);
    const body = {
        userId: userId,
        accountId: accountId,
        amount: satoshis.toString(),
        ttl: 10
    }
    return callApi('/wallets/account/lightning/topup', body, 'POST');
}

export async function getTransactionState(transactionId: string) {
    const userId = process.env.USER_ID!;
    const accountId = process.env.ACCOUNT_ID!;
    const body = {
        userId: userId,
        accountId: accountId,
        txId: transactionId
    } 
    const response = await callApi('/wallets/account/get-transactions-by-id', body, 'POST');
    if (response.data && response.data.transactions && response.data.count > 1) {
        const transaction = response.data.transactions[0];
        if (transaction.txType === 'LN_INCOMING_CONFIRMED') {
            return { status: 'PAID'}
        }
        if (transaction.txType === 'LN_INCOMING_EXPIRED') {
            return { status: 'EXPIRED'}
        }
    }
    return { status: 'OPEN'}
}