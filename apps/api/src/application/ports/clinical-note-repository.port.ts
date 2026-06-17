import { ClinicalNote } from '../../domain/entities/clinical-note.js';

export interface ClinicalNoteRepositoryPort {
  create(note: ClinicalNote): Promise<ClinicalNote>;
  findBySessionId(sessionId: string): Promise<ClinicalNote | null>;
  update(note: ClinicalNote): Promise<ClinicalNote>;
}
