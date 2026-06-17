export type GenerateClinicalNoteInput = {
  sessionSummary: string;
  template: string;
  language: string;
};

export type GeneratedClinicalNote = {
  consultationReason: string;
  currentProblem: string;
  background: string;
  mentalStatus: string;
  conceptualization: string;
  intervention: string;
  clinicalImpression: string;
  plan: string;
  recommendations: string;
  professionalObservations: string;
  missingInformation: string;
};

export async function generateClinicalNote(
  _input: GenerateClinicalNoteInput
): Promise<GeneratedClinicalNote> {
  throw new Error('generate_clinical_note MCP tool is not implemented yet.');
}
