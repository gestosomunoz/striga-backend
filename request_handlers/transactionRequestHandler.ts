import { Router } from 'express';
import dotenv from 'dotenv';

import { getTransactionState, topupAccount } from '../striga-api/striga-adapter';
import { TransactionController } from '../controllers/TransactionController';

dotenv.config();

export const transactionRequestHandler = Router();

transactionRequestHandler.post('/topup', async (req, res) => {
  try {
    // Check if req.body contains the 'amount' field
    if (!req.body.hasOwnProperty('amount')) {
      return res.status(400).json({ error: 'Missing amount in request body' });
    }

    const amount = req.body.amount;

    const topup = await TransactionController.getInstance().topupAccount(amount);
    res.json(topup);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});

transactionRequestHandler.post('/:transactionId', async (req, res) => {
  const transactionId = req.params.transactionId;
  try {

    const state = await TransactionController.getInstance().getTransactionState(transactionId);
    console.log(state);
    res.json(state);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});