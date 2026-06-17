import { ClinicalNoteModel } from '../../domain/entities/clinical-note.js';

export interface ClinicalNoteGeneratorPort {
  generateClinicalNote(input: {
    sessionSummary: string;
    template: string;
    language: string;
  }): Promise<Omit<ClinicalNoteModel, 'id' | 'sessionId' | 'approvedAt' | 'createdAt'>>;
}
