import { Router } from 'express';
import dotenv from 'dotenv';

import { getExchangeRates } from '../striga-api/striga-adapter';
import { TradeController } from '../controllers/TradeController';

dotenv.config();

export const tradeRequestHandler = Router();

tradeRequestHandler.get('/exchange/:currency', async (req, res) => {
  const currency = req.params.currency;

  const rates = await TradeController.getInstance().getExchangeRates(currency);
  console.log('Exchange rates for ' + currency, rates);
  res.json(rates); 
});