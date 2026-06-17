import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import {
  DomainError,
  DomainErrorKindEnum
} from '../../domain/errors/domain-error.js';
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
  const statusCode = getStatusCode(error);

  response.status(statusCode).json({ error: message });
};

function getStatusCode(error: unknown): number {
  if (!(error instanceof DomainError)) {
    return 500;
  }

  switch (error.kind) {
    case DomainErrorKindEnum.BadRequest:
      return 400;
    case DomainErrorKindEnum.Forbidden:
      return 403;
    case DomainErrorKindEnum.NotFound:
      return 404;
    case DomainErrorKindEnum.Conflict:
      return 409;
  }
}
