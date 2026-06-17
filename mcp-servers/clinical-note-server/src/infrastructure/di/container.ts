import type { GenerateClinicalNoteUseCase } from '../../application/use-cases/generate-clinical-note.use-case.js';

let generateClinicalNoteUseCase: GenerateClinicalNoteUseCase | undefined;

export async function getGenerateClinicalNoteUseCase(): Promise<GenerateClinicalNoteUseCase> {
  if (!generateClinicalNoteUseCase) {
    const [
      { MockClinicalNoteDraftGeneratorAdapter },
      { GenerateClinicalNoteUseCase }
    ] = await Promise.all([
      import('../adapters/mock-clinical-note-draft-generator.adapter.js'),
      import('../../application/use-cases/generate-clinical-note.use-case.js')
    ]);

    generateClinicalNoteUseCase = new GenerateClinicalNoteUseCase(
      new MockClinicalNoteDraftGeneratorAdapter()
    );
  }

  return generateClinicalNoteUseCase;
}
