import { randomUUID } from 'node:crypto';
import { AuditActionEnum } from '../../domain/enums/audit-action.enum.js';
import { AuditEntityTypeEnum } from '../../domain/enums/audit-entity-type.enum.js';
import { ClinicalNoteStatusEnum } from '../../domain/enums/clinical-note-status.enum.js';
import { domainErrors } from '../../domain/errors/domain-error.js';
import { SessionStatusEnum } from '../../domain/enums/session-status.enum.js';
import type { ApproveClinicalNoteInputModel } from '../models/approve-clinical-note-input.model.js';
import type { ClinicalNoteModel } from '../../domain/entities/clinical-note.js';
import { errorMessages } from '../../domain/messages/error-messages.js';
import { assertRequiredStringField } from '../../domain/validation/assertions.js';
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
    const clinicalNoteId = assertRequiredStringField(input, 'clinicalNoteId');
    const psychologistId = assertRequiredStringField(input, 'psychologistId');

    const clinicalNote = await this.clinicalNoteRepository.findById(
      clinicalNoteId
    );

    if (!clinicalNote) {
      throw domainErrors.notFound(
        errorMessages.clinicalNoteNotFound(clinicalNoteId)
      );
    }

    if (clinicalNote.status === ClinicalNoteStatusEnum.Approved) {
      throw domainErrors.conflict(errorMessages.clinicalNoteAlreadyApproved);
    }

    const session = await this.sessionRepository.findById(
      clinicalNote.sessionId
    );

    if (!session) {
      throw domainErrors.notFound(
        errorMessages.sessionNotFound(clinicalNote.sessionId)
      );
    }

    if (session.psychologistId !== psychologistId) {
      throw domainErrors.forbidden(
        errorMessages.clinicalNoteDoesNotBelongToPsychologist
      );
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
      userId: psychologistId,
      action: AuditActionEnum.Approve,
      entityType: AuditEntityTypeEnum.ClinicalNote,
      entityId: approvedNote.id,
      createdAt: new Date()
    });

    return approvedNote;
  }
}
