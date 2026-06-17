import { randomUUID } from 'node:crypto';
import type { AuditLogRepositoryPort } from '../ports/audit-log-repository.port.js';
import type { PatientRepositoryPort } from '../ports/patient-repository.port.js';
import type { SessionRepositoryPort } from '../ports/session-repository.port.js';
import {
  AuditActionEnum,
  AuditEntityTypeEnum
} from '../../domain/entities/audit-log.js';
import type { CreateSessionInputModel } from '../../domain/entities/create-session-input.js';
import {
  SessionStatusEnum,
  type SessionModel
} from '../../domain/entities/session.js';

export class CreateSessionUseCase {
  constructor(
    private readonly sessionRepository: SessionRepositoryPort,
    private readonly patientRepository: PatientRepositoryPort,
    private readonly auditLogRepository: AuditLogRepositoryPort
  ) {}

  async execute(input: CreateSessionInputModel): Promise<SessionModel> {
    if (!input.patientId) {
      throw new Error('patientId is required.');
    }

    if (!input.psychologistId) {
      throw new Error('psychologistId is required.');
    }

    const patient = await this.patientRepository.findById(input.patientId);

    if (!patient) {
      throw new Error(`Patient with id ${input.patientId} was not found.`);
    }

    if (patient.psychologistId !== input.psychologistId) {
      throw new Error('Patient does not belong to the psychologist.');
    }

    const session: SessionModel = {
      id: randomUUID(),
      patientId: input.patientId,
      psychologistId: input.psychologistId,
      sessionDate: input.sessionDate ?? new Date(),
      rawInputText: input.rawInputText,
      status: SessionStatusEnum.Created,
      createdAt: new Date()
    };

    const createdSession = await this.sessionRepository.create(session);

    await this.auditLogRepository.create({
      id: randomUUID(),
      userId: input.psychologistId,
      action: AuditActionEnum.Create,
      entityType: AuditEntityTypeEnum.Session,
      entityId: createdSession.id,
      createdAt: new Date()
    });

    return createdSession;
  }
}
