import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { defaultRoute } from './routes/defaultRoute';
import bodyParser from 'body-parser';
import { pingRoute } from './routes/pingRoute';
import { getExchangeRoute } from './routes/getExchangeRoute';
import cors from 'cors';

dotenv.config();

const app: Express = express();
export const router = express.Router();
const port = process.env.PORT;

router.use(defaultRoute);
router.use(pingRoute);
router.use(getExchangeRoute);

app.use(cors());
app.use('/', router);
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(port, () => {
  console.log(`[server]: Serverr is running at http://localhost:${port}`);
});