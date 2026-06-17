import { randomUUID } from 'node:crypto';
import { AuditActionEnum } from '../../domain/enums/audit-action.enum.js';
import { AuditEntityTypeEnum } from '../../domain/enums/audit-entity-type.enum.js';
import { ClinicalNoteStatusEnum } from '../../domain/enums/clinical-note-status.enum.js';
import type { ClinicalNoteModel } from '../../domain/entities/clinical-note.js';
import { errorMessages } from '../../domain/messages/error-messages.js';
import { assertRequiredStringField } from '../../domain/validation/assertions.js';
import type { ExportClinicalNotePdfInputModel } from '../models/export-clinical-note-pdf-input.model.js';
import type { ExportClinicalNotePdfResultModel } from '../models/export-clinical-note-pdf-result.model.js';
import type { AuditLogRepositoryPort } from '../ports/audit-log-repository.port.js';
import type { ClinicalNoteRepositoryPort } from '../ports/clinical-note-repository.port.js';
import type { PdfGeneratorPort } from '../ports/pdf-generator.port.js';
import type { SessionRepositoryPort } from '../ports/session-repository.port.js';

export class ExportClinicalNotePdfUseCase {
  constructor(
    private readonly clinicalNoteRepository: ClinicalNoteRepositoryPort,
    private readonly sessionRepository: SessionRepositoryPort,
    private readonly pdfGenerator: PdfGeneratorPort,
    private readonly auditLogRepository: AuditLogRepositoryPort
  ) {}

  async execute(
    input: ExportClinicalNotePdfInputModel
  ): Promise<ExportClinicalNotePdfResultModel> {
    const clinicalNoteId = assertRequiredStringField(input, 'clinicalNoteId');
    const psychologistId = assertRequiredStringField(input, 'psychologistId');

    const clinicalNote = await this.clinicalNoteRepository.findById(
      clinicalNoteId
    );

    if (!clinicalNote) {
      throw new Error(errorMessages.clinicalNoteNotFound(clinicalNoteId));
    }

    if (clinicalNote.status !== ClinicalNoteStatusEnum.Approved) {
      throw new Error(errorMessages.onlyApprovedClinicalNotesCanBeExported);
    }

    const session = await this.sessionRepository.findById(
      clinicalNote.sessionId
    );

    if (!session) {
      throw new Error(errorMessages.sessionNotFound(clinicalNote.sessionId));
    }

    if (session.psychologistId !== psychologistId) {
      throw new Error(errorMessages.clinicalNoteDoesNotBelongToPsychologist);
    }

    const pdf = await this.pdfGenerator.generatePdf({
      clinicalNoteId: clinicalNote.id,
      html: this.renderClinicalNoteHtml(clinicalNote)
    });

    await this.auditLogRepository.create({
      id: randomUUID(),
      userId: psychologistId,
      action: AuditActionEnum.Export,
      entityType: AuditEntityTypeEnum.ClinicalNote,
      entityId: clinicalNote.id,
      createdAt: new Date()
    });

    return pdf;
  }

  private renderClinicalNoteHtml(clinicalNote: ClinicalNoteModel): string {
    return `
      <article>
        <h1>Clinical Note</h1>
        <section><h2>Consultation reason</h2><p>${clinicalNote.consultationReason}</p></section>
        <section><h2>Current problem</h2><p>${clinicalNote.currentProblem}</p></section>
        <section><h2>Background</h2><p>${clinicalNote.background}</p></section>
        <section><h2>Mental status</h2><p>${clinicalNote.mentalStatus}</p></section>
        <section><h2>Conceptualization</h2><p>${clinicalNote.conceptualization}</p></section>
        <section><h2>Intervention</h2><p>${clinicalNote.intervention}</p></section>
        <section><h2>Clinical impression</h2><p>${clinicalNote.clinicalImpression}</p></section>
        <section><h2>Plan</h2><p>${clinicalNote.plan}</p></section>
        <section><h2>Recommendations</h2><p>${clinicalNote.recommendations}</p></section>
        <section><h2>Professional observations</h2><p>${clinicalNote.professionalObservations}</p></section>
        <section><h2>Missing information</h2><p>${clinicalNote.missingInformation}</p></section>
      </article>
    `;
  }
}
