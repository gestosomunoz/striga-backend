"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrigaProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
class StrigaProvider {
    constructor() {
        this.baseUrl = 'https://www.sandbox.striga.com/api/v1';
    }
    getAuthHeader(body, path, method) {
        const hmac = crypto_1.default.createHmac('sha256', process.env.API_SECRET);
        const time = Date.now().toString();
        hmac.update(time);
        hmac.update(method);
        hmac.update(path);
        const contentHash = crypto_1.default.createHash('md5');
        contentHash.update(JSON.stringify(body));
        hmac.update(contentHash.digest('hex'));
        return `HMAC ${time}:${hmac.digest('hex')}`;
    }
    callApi(path, body, method) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseUrl + path;
            const authorization = this.getAuthHeader(body, path, method);
            let config = {
                method: method,
                url: url,
                headers: {
                    Authorization: authorization,
                    'api-key': process.env.API_KEY,
                },
                data: body
            };
            const response = yield (0, axios_1.default)(config);
            return response.data;
        });
    }
    getExchangeRates() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiResponse = yield this.callApi('/trade/rates', {}, 'POST');
            return apiResponse;
        });
    }
    topupAccount(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = process.env.USER_ID;
            const accountId = process.env.ACCOUNT_ID;
            const satoshis = Math.floor(100000000 * amount);
            const body = {
                userId: userId,
                accountId: accountId,
                amount: satoshis.toString(),
                ttl: 10
            };
            const response = yield this.callApi('/wallets/account/lightning/topup', body, 'POST');
            return {
                transactionId: response.id,
                invoice: response.invoice,
                expiry: response.expiry
            };
        });
    }
    getTransactionState(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = process.env.USER_ID;
            const accountId = process.env.ACCOUNT_ID;
            const body = {
                userId: userId,
                accountId: accountId,
                txId: transactionId
            };
            const response = yield this.callApi('/wallets/account/get-transactions-by-id', body, 'POST');
            console.log(response);
            if (response && response.transactions && response.count > 0) {
                const transaction = response.transactions[0];
                if (transaction.txType === 'LN_INCOMING_CONFIRMED') {
                    return { transactionState: 'PAID' };
                }
                if (transaction.txType === 'LN_INCOMING_EXPIRED') {
                    return { transactionState: 'EXPIRED' };
                }
            }
            return { transactionState: 'OPEN' };
        });
    }
}
exports.StrigaProvider = StrigaProvider;
