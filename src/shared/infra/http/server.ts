import 'reflect-metadata';

import cors from 'cors';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(routes);

// app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
//   if (err instanceof AppError) {
//     return response.status(err.statusCode).json({
//       status: 'error',
//       message: err.message,
//     });
//   }

//   return response.status(500).json({
//     status: 'error',
//     message: 'Internal Server Error',
//   });
// });

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
