import { Router } from 'express';
import dotenv from 'dotenv';
import accountController from '../controllers/AccountController';

dotenv.config();

export const accountRequestHandler = Router();

accountRequestHandler.get('/balance', async (req, res, next) => {
  try {
    const balance = await accountController.getCurrentBalance();
    res.json(balance);
  } catch (error) {
    next(error)
  }
});