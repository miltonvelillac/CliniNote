export type PatientModel = {
  id: string;
  psychologistId: string;
  fullName: string;
  document?: string;
  birthDate?: Date;
  phone?: string;
  createdAt: Date;
};
