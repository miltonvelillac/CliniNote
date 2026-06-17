import { randomUUID } from 'node:crypto';
import {
  AuditActionEnum,
  AuditEntityTypeEnum
} from '../../domain/entities/audit-log.js';
import type { ClinicalNoteModel } from '../../domain/entities/clinical-note.js';
import type { GenerateClinicalNoteInputModel } from '../../domain/entities/generate-clinical-note-input.js';
import {
  SessionStatusEnum,
  type SessionModel
} from '../../domain/entities/session.js';
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
    const session = await this.findOwnedSession(
      input.sessionId,
      input.psychologistId
    );
    const sessionSummary = this.getSessionSummary(session);
    const existingNote = await this.clinicalNoteRepository.findBySessionId(
      session.id
    );

    if (existingNote) {
      throw new Error(`Clinical note for session ${session.id} already exists.`);
    }

    const generatedNote = await this.clinicalNoteGenerator.generateClinicalNote({
      sessionSummary,
      template: input.template,
      language: input.language
    });

    const clinicalNote: ClinicalNoteModel = {
      id: randomUUID(),
      sessionId: session.id,
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
    if (!sessionId) {
      throw new Error('sessionId is required.');
    }

    if (!psychologistId) {
      throw new Error('psychologistId is required.');
    }

    const session = await this.sessionRepository.findById(sessionId);

    if (!session) {
      throw new Error(`Session with id ${sessionId} was not found.`);
    }

    if (session.psychologistId !== psychologistId) {
      throw new Error('Session does not belong to the psychologist.');
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
      throw new Error('Session summary or transcription is required.');
    }

    return sessionSummary;
  }
}
