import { Router } from 'express';
import dotenv from 'dotenv';
import transactionController from '../controllers/TransactionController';


dotenv.config();

export const transactionRequestHandler = Router();

transactionRequestHandler.post('/topup', async (req, res, next) => {
  try {
    if (!req.body.hasOwnProperty('amount')) {
      return res.status(400).json({ error: 'Missing amount in request body' });
    }

    const amount = req.body.amount;

    const topup = await transactionController.topupAccount(amount);
    res.json(topup);
  } catch (error) {
    next(error)
  }
});

transactionRequestHandler.post('/:transactionId', async (req, res, next) => {
  try {
    const transactionId = req.params.transactionId;
    const state = await transactionController.getTransactionState(transactionId);
    res.json(state);
  } catch (error) {
    next(error)
  }
});