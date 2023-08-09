import { Router } from 'express';
import dotenv from 'dotenv';

import { getExchangeRates } from '../striga-api/striga-adapter';

dotenv.config();

export const getExchangeRoute = Router();

getExchangeRoute.get('/trade/exchange/:currency', async (req, res) => {
  const currency = req.params.currency;

  const rates = await getExchangeRates();
  res.json(rates[currency]); // Send the response data from the external API to the client
});