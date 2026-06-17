export type Patient = {
  id: string;
  psychologistId: string;
  fullName: string;
  document?: string;
  birthDate?: Date;
  phone?: string;
  createdAt: Date;
};
