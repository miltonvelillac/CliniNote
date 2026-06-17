import type { ListPatientsInputModel } from '../../domain/entities/list-patients-input.js';
import type { PatientModel } from '../../domain/entities/patient.js';
import type { PatientRepositoryPort } from '../ports/patient-repository.port.js';

export class ListPatientsUseCase {
  constructor(private readonly patientRepository: PatientRepositoryPort) {}

  async execute(input: ListPatientsInputModel): Promise<PatientModel[]> {
    if (!input.psychologistId) {
      throw new Error('psychologistId is required.');
    }

    return this.patientRepository.findAllByPsychologistId(input.psychologistId);
  }
}
