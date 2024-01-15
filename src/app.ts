import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import { demarrerBd } from './components/database';
import { etudiantRouter } from './components/etudiant';
import { classRouter } from './components/classe';
import { errorHandler } from './utils';
dotenv.config();

const port = process.env.PORT || 9000;
const app = express();
app
  .use(
    cors({
      origin: '*',
    })
  )
  .use(express.json())
  .use(morgan('dev'));

app
  .use('/public', express.static('assets'))
  .use(favicon('./assets/images/favicon.ico'));

app.get('/', (req, res) => {
  res.send('it works. Done by BrightkyEfoo');
});
// Do your logic here

app.use('/api/v1/etudiant', etudiantRouter);
app.use('/api/v1/classe', classRouter);

// app.use();

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  await demarrerBd();
});

// process.on('uncaughtException', (error: any) => {
//   errorHandler.handleError(error);
// });

// process.on('unhandledRejection', (reason: any) => {
//   errorHandler.handleError(reason);
// });
