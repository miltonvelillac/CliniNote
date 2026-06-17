import type { NextFunction, Request, Response } from 'express';
import { container } from '../../../infrastructure/di/container.js';

export class SessionsController {
  create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const session = await container.createSessionUseCase.execute({
        patientId: request.body.patientId,
        psychologistId: request.body.psychologistId,
        sessionDate: parseOptionalDate(request.body.sessionDate),
        rawInputText: request.body.rawInputText
      });

      response.status(201).json(session);
    } catch (error) {
      next(error);
    }
  };

  generateClinicalNote = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const clinicalNote =
        await container.generateClinicalNoteUseCase.execute({
          sessionId: request.params.id,
          psychologistId: request.body.psychologistId,
          template: request.body.template,
          language: request.body.language
        });

      response.status(201).json(clinicalNote);
    } catch (error) {
      next(error);
    }
  };
}

function parseOptionalDate(value: unknown): Date | undefined {
  if (!value) {
    return undefined;
  }

  return new Date(String(value));
}

export const sessionsController = new SessionsController();
