import { randomUUID } from 'node:crypto';
import type { AuditLogRepositoryPort } from '../ports/audit-log-repository.port.js';
import type { PatientRepositoryPort } from '../ports/patient-repository.port.js';
import { AuditActionEnum } from '../../domain/enums/audit-action.enum.js';
import { AuditEntityTypeEnum } from '../../domain/enums/audit-entity-type.enum.js';
import type { PatientModel } from '../../domain/entities/patient.js';
import {
  assertOptionalValidDateField,
  assertRequiredStringField,
  normalizeOptionalStringField
} from '../../domain/validation/assertions.js';
import type { CreatePatientInputModel } from '../models/create-patient-input.model.js';

export class CreatePatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepositoryPort,
    private readonly auditLogRepository: AuditLogRepositoryPort
  ) {}

  async execute(input: CreatePatientInputModel): Promise<PatientModel> {
    const psychologistId = assertRequiredStringField(input, 'psychologistId');
    const fullName = assertRequiredStringField(input, 'fullName');

    const patient: PatientModel = {
      id: randomUUID(),
      psychologistId,
      fullName,
      document: normalizeOptionalStringField(input, 'document'),
      birthDate: assertOptionalValidDateField(input, 'birthDate'),
      phone: normalizeOptionalStringField(input, 'phone'),
      createdAt: new Date()
    };

    const createdPatient = await this.patientRepository.create(patient);

    await this.auditLogRepository.create({
      id: randomUUID(),
      userId: psychologistId,
      action: AuditActionEnum.Create,
      entityType: AuditEntityTypeEnum.Patient,
      entityId: createdPatient.id,
      createdAt: new Date()
    });

    return createdPatient;
  }
}
