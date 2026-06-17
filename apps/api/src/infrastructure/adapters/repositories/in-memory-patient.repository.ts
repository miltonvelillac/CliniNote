import type { PatientRepositoryPort } from '../../../application/ports/patient-repository.port.js';
import type { PatientModel } from '../../../domain/entities/patient.js';

export class InMemoryPatientRepository implements PatientRepositoryPort {
  private readonly patients = new Map<string, PatientModel>();

  async create(patient: PatientModel): Promise<PatientModel> {
    this.patients.set(patient.id, patient);
    return patient;
  }

  async findById(id: string): Promise<PatientModel | null> {
    return this.patients.get(id) ?? null;
  }

  async findAllByPsychologistId(psychologistId: string): Promise<PatientModel[]> {
    return [...this.patients.values()].filter(
      (patient) => patient.psychologistId === psychologistId
    );
  }
}
