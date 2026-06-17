import { randomUUID } from 'node:crypto';
import { AuditActionEnum } from '../../domain/enums/audit-action.enum.js';
import { AuditEntityTypeEnum } from '../../domain/enums/audit-entity-type.enum.js';
import { ClinicalNoteStatusEnum } from '../../domain/enums/clinical-note-status.enum.js';
import { SessionStatusEnum } from '../../domain/enums/session-status.enum.js';
import type { ApproveClinicalNoteInputModel } from '../models/approve-clinical-note-input.model.js';
import type { ClinicalNoteModel } from '../../domain/entities/clinical-note.js';
import type { AuditLogRepositoryPort } from '../ports/audit-log-repository.port.js';
import type { ClinicalNoteRepositoryPort } from '../ports/clinical-note-repository.port.js';
import type { SessionRepositoryPort } from '../ports/session-repository.port.js';

export class ApproveClinicalNoteUseCase {
  constructor(
    private readonly clinicalNoteRepository: ClinicalNoteRepositoryPort,
    private readonly sessionRepository: SessionRepositoryPort,
    private readonly auditLogRepository: AuditLogRepositoryPort
  ) {}

  async execute(
    input: ApproveClinicalNoteInputModel
  ): Promise<ClinicalNoteModel> {
    if (!input.clinicalNoteId) {
      throw new Error('clinicalNoteId is required.');
    }

    if (!input.psychologistId) {
      throw new Error('psychologistId is required.');
    }

    const clinicalNote = await this.clinicalNoteRepository.findById(
      input.clinicalNoteId
    );

    if (!clinicalNote) {
      throw new Error(
        `Clinical note with id ${input.clinicalNoteId} was not found.`
      );
    }

    if (clinicalNote.status === ClinicalNoteStatusEnum.Approved) {
      throw new Error('Clinical note is already approved.');
    }

    const session = await this.sessionRepository.findById(
      clinicalNote.sessionId
    );

    if (!session) {
      throw new Error(
        `Session with id ${clinicalNote.sessionId} was not found.`
      );
    }

    if (session.psychologistId !== input.psychologistId) {
      throw new Error('Clinical note does not belong to the psychologist.');
    }

    const approvedNote = await this.clinicalNoteRepository.update({
      ...clinicalNote,
      status: ClinicalNoteStatusEnum.Approved,
      approvedAt: new Date()
    });

    await this.sessionRepository.update({
      ...session,
      status: SessionStatusEnum.Approved
    });

    await this.auditLogRepository.create({
      id: randomUUID(),
      userId: input.psychologistId,
      action: AuditActionEnum.Approve,
      entityType: AuditEntityTypeEnum.ClinicalNote,
      entityId: approvedNote.id,
      createdAt: new Date()
    });

    return approvedNote;
  }
}
