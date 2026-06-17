import { randomUUID } from 'node:crypto';
import type { AuditLogRepositoryPort } from '../ports/audit-log-repository.port.js';
import type { PatientRepositoryPort } from '../ports/patient-repository.port.js';
import {
  AuditActionEnum,
  AuditEntityTypeEnum
} from '../../domain/entities/audit-log.js';
import type { PatientModel } from '../../domain/entities/patient.js';
import { CreatePatientInputModel } from '@clininote/api/domain/entities/create-patient-input.js';

export class CreatePatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepositoryPort,
    private readonly auditLogRepository: AuditLogRepositoryPort
  ) {}

  async execute(input: CreatePatientInputModel): Promise<PatientModel> {
    const fullName = input.fullName.trim();

    if (!input.psychologistId) {
      throw new Error('psychologistId is required.');
    }

    if (!fullName) {
      throw new Error('fullName is required.');
    }

    const patient: PatientModel = {
      id: randomUUID(),
      psychologistId: input.psychologistId,
      fullName,
      document: input.document,
      birthDate: input.birthDate,
      phone: input.phone,
      createdAt: new Date()
    };

    const createdPatient = await this.patientRepository.create(patient);

    await this.auditLogRepository.create({
      id: randomUUID(),
      userId: input.psychologistId,
      action: AuditActionEnum.Create,
      entityType: AuditEntityTypeEnum.Patient,
      entityId: createdPatient.id,
      createdAt: new Date()
    });

    return createdPatient;
  }
}
