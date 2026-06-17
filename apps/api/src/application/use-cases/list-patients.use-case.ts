import type { ListPatientsInputModel } from '../models/list-patients-input.model.js';
import type { PatientModel } from '../../domain/entities/patient.js';
import { assertRequiredStringField } from '../../domain/validation/assertions.js';
import type { PatientRepositoryPort } from '../ports/patient-repository.port.js';

export class ListPatientsUseCase {
  constructor(private readonly patientRepository: PatientRepositoryPort) {}

  async execute(input: ListPatientsInputModel): Promise<PatientModel[]> {
    const psychologistId = assertRequiredStringField(input, 'psychologistId');

    return this.patientRepository.findAllByPsychologistId(psychologistId);
  }
}
