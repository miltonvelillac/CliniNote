import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import { routes } from './routes.js';

export function createHttpServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok', service: 'clininote-api' });
  });

  app.use('/api', routes);
  app.use(errorHandler);

  return app;
}

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const message =
    error instanceof Error ? error.message : 'Unexpected application error.';

  response.status(400).json({ error: message });
};
