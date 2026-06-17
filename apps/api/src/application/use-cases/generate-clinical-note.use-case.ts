import { randomUUID } from 'node:crypto';
import { AuditActionEnum } from '../../domain/enums/audit-action.enum.js';
import { AuditEntityTypeEnum } from '../../domain/enums/audit-entity-type.enum.js';
import { ClinicalNoteStatusEnum } from '../../domain/enums/clinical-note-status.enum.js';
import { domainErrors } from '../../domain/errors/domain-error.js';
import { SessionStatusEnum } from '../../domain/enums/session-status.enum.js';
import type { ClinicalNoteModel } from '../../domain/entities/clinical-note.js';
import type { SessionModel } from '../../domain/entities/session.js';
import { errorMessages } from '../../domain/messages/error-messages.js';
import { assertRequiredStringField } from '../../domain/validation/assertions.js';
import type { GenerateClinicalNoteInputModel } from '../models/generate-clinical-note-input.model.js';
import type { AuditLogRepositoryPort } from '../ports/audit-log-repository.port.js';
import type { ClinicalNoteGeneratorPort } from '../ports/clinical-note-generator.port.js';
import type { ClinicalNoteRepositoryPort } from '../ports/clinical-note-repository.port.js';
import type { SessionRepositoryPort } from '../ports/session-repository.port.js';

export class GenerateClinicalNoteUseCase {
  constructor(
    private readonly sessionRepository: SessionRepositoryPort,
    private readonly clinicalNoteRepository: ClinicalNoteRepositoryPort,
    private readonly clinicalNoteGenerator: ClinicalNoteGeneratorPort,
    private readonly auditLogRepository: AuditLogRepositoryPort
  ) {}

  async execute(
    input: GenerateClinicalNoteInputModel
  ): Promise<ClinicalNoteModel> {
    const template = assertRequiredStringField(input, 'template');
    const language = assertRequiredStringField(input, 'language');
    const session = await this.findOwnedSession(
      input.sessionId,
      input.psychologistId
    );
    const sessionSummary = this.getSessionSummary(session);
    const existingNote = await this.clinicalNoteRepository.findBySessionId(
      session.id
    );

    if (existingNote) {
      throw domainErrors.conflict(
        errorMessages.clinicalNoteForSessionAlreadyExists(session.id)
      );
    }

    const generatedNote = await this.clinicalNoteGenerator.generateClinicalNote({
      sessionSummary,
      template,
      language
    });

    const clinicalNote: ClinicalNoteModel = {
      id: randomUUID(),
      sessionId: session.id,
      status: ClinicalNoteStatusEnum.Draft,
      ...generatedNote,
      createdAt: new Date()
    };

    const createdNote = await this.clinicalNoteRepository.create(clinicalNote);

    await this.sessionRepository.update({
      ...session,
      status: SessionStatusEnum.NoteGenerated
    });

    await this.auditLogRepository.create({
      id: randomUUID(),
      userId: input.psychologistId,
      action: AuditActionEnum.Generate,
      entityType: AuditEntityTypeEnum.ClinicalNote,
      entityId: createdNote.id,
      createdAt: new Date()
    });

    return createdNote;
  }

  private async findOwnedSession(
    sessionId: string,
    psychologistId: string
  ): Promise<SessionModel> {
    const input = { sessionId, psychologistId };
    const normalizedSessionId = assertRequiredStringField(input, 'sessionId');
    const normalizedPsychologistId = assertRequiredStringField(
      input,
      'psychologistId'
    );

    const session = await this.sessionRepository.findById(normalizedSessionId);

    if (!session) {
      throw domainErrors.notFound(
        errorMessages.sessionNotFound(normalizedSessionId)
      );
    }

    if (session.psychologistId !== normalizedPsychologistId) {
      throw domainErrors.forbidden(
        errorMessages.sessionDoesNotBelongToPsychologist
      );
    }

    return session;
  }

  private getSessionSummary(session: SessionModel): string {
    const sessionSummary = (
      session.transcriptionText ??
      session.rawInputText ??
      ''
    ).trim();

    if (!sessionSummary) {
      throw domainErrors.badRequest(errorMessages.sessionSummaryRequired);
    }

    return sessionSummary;
  }
}
