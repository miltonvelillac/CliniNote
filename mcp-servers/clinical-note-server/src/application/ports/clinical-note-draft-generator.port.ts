import type { GenerateClinicalNoteInputModel } from '../models/generate-clinical-note-input.model.js';
import type { GeneratedClinicalNoteModel } from '../../domain/models/generated-clinical-note.model.js';

export interface ClinicalNoteDraftGeneratorPort {
  generate(input: GenerateClinicalNoteInputModel): Promise<GeneratedClinicalNoteModel>;
}
