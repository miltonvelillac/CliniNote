import { ApproveClinicalNoteUseCase } from '../../application/use-cases/approve-clinical-note.use-case.js';
import { CreatePatientUseCase } from '../../application/use-cases/create-patient.use-case.js';
import { CreateSessionUseCase } from '../../application/use-cases/create-session.use-case.js';
import { ExportClinicalNotePdfUseCase } from '../../application/use-cases/export-clinical-note-pdf.use-case.js';
import { GenerateClinicalNoteUseCase } from '../../application/use-cases/generate-clinical-note.use-case.js';
import { ListPatientsUseCase } from '../../application/use-cases/list-patients.use-case.js';
import { UpdateClinicalNoteUseCase } from '../../application/use-cases/update-clinical-note.use-case.js';
import { MockClinicalNoteGeneratorAdapter } from '../adapters/mcp/mock-clinical-note-generator.adapter.js';
import { MockPdfGeneratorAdapter } from '../adapters/pdf/mock-pdf-generator.adapter.js';
import { InMemoryAuditLogRepository } from '../adapters/repositories/in-memory-audit-log.repository.js';
import { InMemoryClinicalNoteRepository } from '../adapters/repositories/in-memory-clinical-note.repository.js';
import { InMemoryPatientRepository } from '../adapters/repositories/in-memory-patient.repository.js';
import { InMemorySessionRepository } from '../adapters/repositories/in-memory-session.repository.js';

const patientRepository = new InMemoryPatientRepository();
const sessionRepository = new InMemorySessionRepository();
const clinicalNoteRepository = new InMemoryClinicalNoteRepository();
const auditLogRepository = new InMemoryAuditLogRepository();
const clinicalNoteGenerator = new MockClinicalNoteGeneratorAdapter();
const pdfGenerator = new MockPdfGeneratorAdapter();

export const container = {
  createPatientUseCase: new CreatePatientUseCase(
    patientRepository,
    auditLogRepository
  ),
  listPatientsUseCase: new ListPatientsUseCase(patientRepository),
  createSessionUseCase: new CreateSessionUseCase(
    sessionRepository,
    patientRepository,
    auditLogRepository
  ),
  generateClinicalNoteUseCase: new GenerateClinicalNoteUseCase(
    sessionRepository,
    clinicalNoteRepository,
    clinicalNoteGenerator,
    auditLogRepository
  ),
  updateClinicalNoteUseCase: new UpdateClinicalNoteUseCase(
    clinicalNoteRepository,
    sessionRepository,
    auditLogRepository
  ),
  approveClinicalNoteUseCase: new ApproveClinicalNoteUseCase(
    clinicalNoteRepository,
    sessionRepository,
    auditLogRepository
  ),
  exportClinicalNotePdfUseCase: new ExportClinicalNotePdfUseCase(
    clinicalNoteRepository,
    sessionRepository,
    pdfGenerator,
    auditLogRepository
  )
};
