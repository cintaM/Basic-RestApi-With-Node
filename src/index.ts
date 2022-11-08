import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';

import { useRouter } from './routes';
import bodyParser from 'body-parser';
const cors = require('cors');

const PORT = process.env.PORT || 8091

const app = express()
app.use(bodyParser.json());
app.use(cors())
useRouter(app);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    msg: 'ok',
  })
})

app.listen(PORT, () => console.log('servidor en el puerto ' + PORT))
