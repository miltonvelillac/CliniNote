export type SessionStatus = 'created' | 'transcribed' | 'note_generated' | 'approved';

export type Session = {
  id: string;
  patientId: string;
  psychologistId: string;
  sessionDate: Date;
  rawInputText?: string;
  transcriptionText?: string;
  status: SessionStatus;
  createdAt: Date;
};
