export const errorMessages = {
  required: (fieldName: string) => `${fieldName} is required.`,
  invalidDate: (fieldName: string) => `${fieldName} must be a valid date.`,
  atLeastOneClinicalNoteFieldRequired:
    'At least one clinical note field is required.',
  patientNotFound: (patientId: string) =>
    `Patient with id ${patientId} was not found.`,
  patientDoesNotBelongToPsychologist:
    'Patient does not belong to the psychologist.',
  sessionNotFound: (sessionId: string) =>
    `Session with id ${sessionId} was not found.`,
  sessionDoesNotBelongToPsychologist:
    'Session does not belong to the psychologist.',
  sessionSummaryRequired: 'Session summary or transcription is required.',
  clinicalNoteNotFound: (clinicalNoteId: string) =>
    `Clinical note with id ${clinicalNoteId} was not found.`,
  clinicalNoteForSessionAlreadyExists: (sessionId: string) =>
    `Clinical note for session ${sessionId} already exists.`,
  clinicalNoteDoesNotBelongToPsychologist:
    'Clinical note does not belong to the psychologist.',
  clinicalNoteAlreadyApproved: 'Clinical note is already approved.',
  approvedClinicalNotesCannotBeEdited:
    'Approved clinical notes cannot be edited.',
  onlyApprovedClinicalNotesCanBeExported:
    'Only approved clinical notes can be exported.'
} as const;
