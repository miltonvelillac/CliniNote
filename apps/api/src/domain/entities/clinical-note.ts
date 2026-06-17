export type ClinicalNoteModel = {
  id: string;
  sessionId: string;
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
  approvedAt?: Date;
  createdAt: Date;
};
