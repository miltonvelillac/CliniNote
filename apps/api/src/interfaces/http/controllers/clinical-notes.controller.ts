import type { NextFunction, Request, Response } from 'express';
import { container } from '../../../infrastructure/di/container.js';

export class ClinicalNotesController {
  update = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const clinicalNote =
        await container.updateClinicalNoteUseCase.execute({
          clinicalNoteId: request.params.id,
          psychologistId: request.body.psychologistId,
          consultationReason: request.body.consultationReason,
          currentProblem: request.body.currentProblem,
          background: request.body.background,
          mentalStatus: request.body.mentalStatus,
          conceptualization: request.body.conceptualization,
          intervention: request.body.intervention,
          clinicalImpression: request.body.clinicalImpression,
          plan: request.body.plan,
          recommendations: request.body.recommendations,
          professionalObservations: request.body.professionalObservations,
          missingInformation: request.body.missingInformation
        });

      response.json(clinicalNote);
    } catch (error) {
      next(error);
    }
  };

  approve = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const clinicalNote =
        await container.approveClinicalNoteUseCase.execute({
          clinicalNoteId: request.params.id,
          psychologistId: request.body.psychologistId
        });

      response.json(clinicalNote);
    } catch (error) {
      next(error);
    }
  };

  exportPdf = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const pdf = await container.exportClinicalNotePdfUseCase.execute({
        clinicalNoteId: request.params.id,
        psychologistId: getQueryValue(request.query.psychologistId)
      });

      response.json(pdf);
    } catch (error) {
      next(error);
    }
  };
}

function getQueryValue(value: unknown): string {
  return Array.isArray(value) ? String(value[0] ?? '') : String(value ?? '');
}

export const clinicalNotesController = new ClinicalNotesController();
