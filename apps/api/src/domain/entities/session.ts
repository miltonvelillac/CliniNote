import type { SessionStatusEnum } from '../enums/session-status.enum.js';

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
