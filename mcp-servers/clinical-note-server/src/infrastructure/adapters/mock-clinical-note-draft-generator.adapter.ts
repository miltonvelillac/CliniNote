import type { GenerateClinicalNoteInputModel } from '../../application/models/generate-clinical-note-input.model.js';
import type { ClinicalNoteDraftGeneratorPort } from '../../application/ports/clinical-note-draft-generator.port.js';
import type { GeneratedClinicalNoteModel } from '../../domain/models/generated-clinical-note.model.js';
import { clinicalNoteSystemPrompt } from '../../prompts/clinical-note-system-prompt.js';

export class MockClinicalNoteDraftGeneratorAdapter
  implements ClinicalNoteDraftGeneratorPort
{
  async generate(
    input: GenerateClinicalNoteInputModel
  ): Promise<GeneratedClinicalNoteModel> {
    const sessionSummary = input.sessionSummary.trim();
    const missingInformation = 'Not provided. Requires professional review.';

    return {
      consultationReason: sessionSummary || missingInformation,
      currentProblem: sessionSummary || missingInformation,
      background: missingInformation,
      mentalStatus: missingInformation,
      conceptualization: missingInformation,
      intervention: missingInformation,
      clinicalImpression: missingInformation,
      plan: missingInformation,
      recommendations: missingInformation,
      professionalObservations: `Mock note generated with template "${input.template}" in language "${input.language}". ${clinicalNoteSystemPrompt.trim()}`,
      missingInformation
    };
  }
}
