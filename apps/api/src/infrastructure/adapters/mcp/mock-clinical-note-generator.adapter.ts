import type { ClinicalNoteGeneratorPort } from '@clininote/api/application/ports/clinical-note-generator.port.js';
import type { ClinicalNoteModel } from '@clininote/api/domain/entities/clinical-note.js';

export class MockClinicalNoteGeneratorAdapter implements ClinicalNoteGeneratorPort {
  async generateClinicalNote(input: {
    sessionSummary: string;
    template: string;
    language: string;
  }): Promise<
    Omit<ClinicalNoteModel, 'id' | 'sessionId' | 'status' | 'approvedAt' | 'createdAt'>
  > {
    const missingInformation = 'Not provided. Requires professional review.';

    return {
      consultationReason: input.sessionSummary,
      currentProblem: input.sessionSummary,
      background: missingInformation,
      mentalStatus: missingInformation,
      conceptualization: missingInformation,
      intervention: missingInformation,
      clinicalImpression: missingInformation,
      plan: missingInformation,
      recommendations: missingInformation,
      professionalObservations: missingInformation,
      missingInformation
    };
  }
}
