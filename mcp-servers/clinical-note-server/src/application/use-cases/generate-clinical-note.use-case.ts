import type { GenerateClinicalNoteInputModel } from '../models/generate-clinical-note-input.model.js';
import type { ClinicalNoteDraftGeneratorPort } from '../ports/clinical-note-draft-generator.port.js';
import type { GeneratedClinicalNoteModel } from '../../domain/models/generated-clinical-note.model.js';

export class GenerateClinicalNoteUseCase {
  constructor(
    private readonly clinicalNoteDraftGenerator: ClinicalNoteDraftGeneratorPort
  ) {}

  async execute(
    input: GenerateClinicalNoteInputModel
  ): Promise<GeneratedClinicalNoteModel> {
    return this.clinicalNoteDraftGenerator.generate(input);
  }
}
