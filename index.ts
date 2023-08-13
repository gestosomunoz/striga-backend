import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { tradeRequestHandler } from './request_handlers/tradeRequestHandler';
import cors from 'cors';
import { transactionRequestHandler } from './request_handlers/transactionRequestHandler';
import { accountRequestHandler } from './request_handlers/accountRequestHandler';

dotenv.config();

const app: Express = express();
const router = express.Router();

app.use(cors());


app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

router.use('/trade', tradeRequestHandler);
router.use('/transaction', transactionRequestHandler);
router.use('/account', accountRequestHandler);

app.use('/', router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});