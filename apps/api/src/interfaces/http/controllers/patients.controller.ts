import type { NextFunction, Request, Response } from 'express';
import { container } from '../../../infrastructure/di/container.js';

export class PatientsController {
  create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const patient = await container.createPatientUseCase.execute({
        psychologistId: request.body.psychologistId,
        fullName: request.body.fullName,
        document: request.body.document,
        birthDate: parseOptionalDate(request.body.birthDate),
        phone: request.body.phone
      });

      response.status(201).json(patient);
    } catch (error) {
      next(error);
    }
  };

  list = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const patients = await container.listPatientsUseCase.execute({
        psychologistId: getQueryValue(request.query.psychologistId)
      });

      response.json(patients);
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

function getQueryValue(value: unknown): string {
  return Array.isArray(value) ? String(value[0] ?? '') : String(value ?? '');
}

export const patientsController = new PatientsController();
