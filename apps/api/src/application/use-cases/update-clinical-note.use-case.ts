import { randomUUID } from 'node:crypto';
import { AuditActionEnum } from '../../domain/enums/audit-action.enum.js';
import { AuditEntityTypeEnum } from '../../domain/enums/audit-entity-type.enum.js';
import { ClinicalNoteStatusEnum } from '../../domain/enums/clinical-note-status.enum.js';
import { domainErrors } from '../../domain/errors/domain-error.js';
import type { ClinicalNoteModel } from '../../domain/entities/clinical-note.js';
import { errorMessages } from '../../domain/messages/error-messages.js';
import {
  assertAtLeastOneStringFieldDefined,
  assertRequiredStringField,
  normalizeOptionalStringField
} from '../../domain/validation/assertions.js';
import type { UpdateClinicalNoteInputModel } from '../models/update-clinical-note-input.model.js';
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

    if (clinicalNote.status === ClinicalNoteStatusEnum.Approved) {
      throw domainErrors.conflict(
        errorMessages.approvedClinicalNotesCannotBeEdited
      );
    }

    assertAtLeastOneStringFieldDefined(
      input,
      [
        'consultationReason',
        'currentProblem',
        'background',
        'mentalStatus',
        'conceptualization',
        'intervention',
        'clinicalImpression',
        'plan',
        'recommendations',
        'professionalObservations',
        'missingInformation'
      ],
      errorMessages.atLeastOneClinicalNoteFieldRequired
    );

    const updatedNote: ClinicalNoteModel = {
      ...clinicalNote,
      consultationReason:
        normalizeOptionalStringField(input, 'consultationReason') ??
        clinicalNote.consultationReason,
      currentProblem:
        normalizeOptionalStringField(input, 'currentProblem') ??
        clinicalNote.currentProblem,
      background:
        normalizeOptionalStringField(input, 'background') ??
        clinicalNote.background,
      mentalStatus:
        normalizeOptionalStringField(input, 'mentalStatus') ??
        clinicalNote.mentalStatus,
      conceptualization:
        normalizeOptionalStringField(input, 'conceptualization') ??
        clinicalNote.conceptualization,
      intervention:
        normalizeOptionalStringField(input, 'intervention') ??
        clinicalNote.intervention,
      clinicalImpression:
        normalizeOptionalStringField(input, 'clinicalImpression') ??
        clinicalNote.clinicalImpression,
      plan: normalizeOptionalStringField(input, 'plan') ?? clinicalNote.plan,
      recommendations:
        normalizeOptionalStringField(input, 'recommendations') ??
        clinicalNote.recommendations,
      professionalObservations:
        normalizeOptionalStringField(input, 'professionalObservations') ??
        clinicalNote.professionalObservations,
      missingInformation:
        normalizeOptionalStringField(input, 'missingInformation') ??
        clinicalNote.missingInformation
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
    const input = { clinicalNoteId, psychologistId };
    const normalizedClinicalNoteId = assertRequiredStringField(
      input,
      'clinicalNoteId'
    );
    const normalizedPsychologistId = assertRequiredStringField(
      input,
      'psychologistId'
    );

    const clinicalNote = await this.clinicalNoteRepository.findById(
      normalizedClinicalNoteId
    );

    if (!clinicalNote) {
      throw domainErrors.notFound(
        errorMessages.clinicalNoteNotFound(normalizedClinicalNoteId)
      );
    }

    const session = await this.sessionRepository.findById(
      clinicalNote.sessionId
    );

    if (!session) {
      throw domainErrors.notFound(
        errorMessages.sessionNotFound(clinicalNote.sessionId)
      );
    }

    if (session.psychologistId !== normalizedPsychologistId) {
      throw domainErrors.forbidden(
        errorMessages.clinicalNoteDoesNotBelongToPsychologist
      );
    }

    return clinicalNote;
  }
}
