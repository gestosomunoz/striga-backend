import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const accountRequestHandler = Router();

accountRequestHandler.get('/balance', async (req, res) => {

  //const balance = await TradeController.getInstance().get(currency);
  //console.log('Account balance: ', balance);
  res.json('TODO');
});