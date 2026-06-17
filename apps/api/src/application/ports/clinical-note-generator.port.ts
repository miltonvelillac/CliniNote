import { ClinicalNote } from '../../domain/entities/clinical-note.js';

export interface ClinicalNoteGeneratorPort {
  generateClinicalNote(input: {
    sessionSummary: string;
    template: string;
    language: string;
  }): Promise<Omit<ClinicalNote, 'id' | 'sessionId' | 'approvedAt' | 'createdAt'>>;
}
