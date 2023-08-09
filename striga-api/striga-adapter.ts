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