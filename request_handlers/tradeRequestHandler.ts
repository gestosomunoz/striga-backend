import { Router } from 'express';
import dotenv from 'dotenv';
import tradeController from '../controllers/TradeController';


dotenv.config();

export const tradeRequestHandler = Router();

tradeRequestHandler.get('/exchange/:currency', async (req, res, next) => {
  try {
    const currency = req.params.currency;

    const rates = await tradeController.getExchangeRates(currency);
    res.json(rates); 
  } catch (error) {
    next(error)
  }
});