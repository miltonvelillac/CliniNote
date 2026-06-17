import { PatientModel } from '../../domain/entities/patient.js';

export interface PatientRepositoryPort {
  create(patient: PatientModel): Promise<PatientModel>;
  findById(id: string): Promise<PatientModel | null>;
}
