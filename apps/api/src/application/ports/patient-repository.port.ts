import { Patient } from '../../domain/entities/patient.js';

export interface PatientRepositoryPort {
  create(patient: Patient): Promise<Patient>;
  findById(id: string): Promise<Patient | null>;
}
