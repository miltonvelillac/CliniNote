export enum SessionStatusEnum {
  Created = 'created',
  Transcribed = 'transcribed',
  NoteGenerated = 'note_generated',
  Approved = 'approved'
}

export type SessionModel = {
  id: string;
  patientId: string;
  psychologistId: string;
  sessionDate: Date;
  rawInputText?: string;
  transcriptionText?: string;
  status: SessionStatusEnum;
  createdAt: Date;
};
