export type SessionStatusType = 'created' | 'transcribed' | 'note_generated' | 'approved';

export type SessionModel = {
  id: string;
  patientId: string;
  psychologistId: string;
  sessionDate: Date;
  rawInputText?: string;
  transcriptionText?: string;
  status: SessionStatusType;
  createdAt: Date;
};
