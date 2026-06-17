import { randomUUID } from 'node:crypto';
import {
  AuditActionEnum,
  AuditEntityTypeEnum
} from '../../domain/entities/audit-log.js';
import type { ClinicalNoteModel } from '../../domain/entities/clinical-note.js';
import type { UpdateClinicalNoteInputModel } from '../../domain/entities/update-clinical-note-input.js';
import type { AuditLogRepositoryPort } from '../ports/audit-log-repository.port.js';
import type { ClinicalNoteRepositoryPort } from '../ports/clinical-note-repository.port.js';
import type { SessionRepositoryPort } from '../ports/session-repository.port.js';

export class UpdateClinicalNoteUseCase {
  constructor(
    private readonly clinicalNoteRepository: ClinicalNoteRepositoryPort,
    private readonly sessionRepository: SessionRepositoryPort,
    private readonly auditLogRepository: AuditLogRepositoryPort
  ) {}

  async execute(
    input: UpdateClinicalNoteInputModel
  ): Promise<ClinicalNoteModel> {
    const clinicalNote = await this.findOwnedClinicalNote(
      input.clinicalNoteId,
      input.psychologistId
    );

    if (clinicalNote.approvedAt) {
      throw new Error('Approved clinical notes cannot be edited.');
    }

    const updatedNote: ClinicalNoteModel = {
      ...clinicalNote,
      consultationReason:
        input.consultationReason ?? clinicalNote.consultationReason,
      currentProblem: input.currentProblem ?? clinicalNote.currentProblem,
      background: input.background ?? clinicalNote.background,
      mentalStatus: input.mentalStatus ?? clinicalNote.mentalStatus,
      conceptualization:
        input.conceptualization ?? clinicalNote.conceptualization,
      intervention: input.intervention ?? clinicalNote.intervention,
      clinicalImpression:
        input.clinicalImpression ?? clinicalNote.clinicalImpression,
      plan: input.plan ?? clinicalNote.plan,
      recommendations: input.recommendations ?? clinicalNote.recommendations,
      professionalObservations:
        input.professionalObservations ??
        clinicalNote.professionalObservations,
      missingInformation:
        input.missingInformation ?? clinicalNote.missingInformation
    };

    const savedNote = await this.clinicalNoteRepository.update(updatedNote);

    await this.auditLogRepository.create({
      id: randomUUID(),
      userId: input.psychologistId,
      action: AuditActionEnum.Update,
      entityType: AuditEntityTypeEnum.ClinicalNote,
      entityId: savedNote.id,
      createdAt: new Date()
    });

    return savedNote;
  }

  private async findOwnedClinicalNote(
    clinicalNoteId: string,
    psychologistId: string
  ): Promise<ClinicalNoteModel> {
    if (!clinicalNoteId) {
      throw new Error('clinicalNoteId is required.');
    }

    if (!psychologistId) {
      throw new Error('psychologistId is required.');
    }

    const clinicalNote = await this.clinicalNoteRepository.findById(
      clinicalNoteId
    );

    if (!clinicalNote) {
      throw new Error(`Clinical note with id ${clinicalNoteId} was not found.`);
    }

    const session = await this.sessionRepository.findById(
      clinicalNote.sessionId
    );

    if (!session) {
      throw new Error(
        `Session with id ${clinicalNote.sessionId} was not found.`
      );
    }

    if (session.psychologistId !== psychologistId) {
      throw new Error('Clinical note does not belong to the psychologist.');
    }

    return clinicalNote;
  }
}
