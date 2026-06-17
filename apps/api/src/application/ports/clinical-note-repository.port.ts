import { ClinicalNoteModel } from '../../domain/entities/clinical-note.js';

export interface ClinicalNoteRepositoryPort {
  create(note: ClinicalNoteModel): Promise<ClinicalNoteModel>;
  findBySessionId(sessionId: string): Promise<ClinicalNoteModel | null>;
  update(note: ClinicalNoteModel): Promise<ClinicalNoteModel>;
}
