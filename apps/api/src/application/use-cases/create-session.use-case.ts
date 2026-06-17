import { randomUUID } from 'node:crypto';
import type { AuditLogRepositoryPort } from '../ports/audit-log-repository.port.js';
import type { PatientRepositoryPort } from '../ports/patient-repository.port.js';
import type { SessionRepositoryPort } from '../ports/session-repository.port.js';
import { AuditActionEnum } from '../../domain/enums/audit-action.enum.js';
import { AuditEntityTypeEnum } from '../../domain/enums/audit-entity-type.enum.js';
import { SessionStatusEnum } from '../../domain/enums/session-status.enum.js';
import { errorMessages } from '../../domain/messages/error-messages.js';
import {
  assertOptionalValidDateField,
  assertRequiredStringField,
  normalizeOptionalStringField
} from '../../domain/validation/assertions.js';
import type { CreateSessionInputModel } from '../models/create-session-input.model.js';
import type { SessionModel } from '../../domain/entities/session.js';

export class CreateSessionUseCase {
  constructor(
    private readonly sessionRepository: SessionRepositoryPort,
    private readonly patientRepository: PatientRepositoryPort,
    private readonly auditLogRepository: AuditLogRepositoryPort
  ) {}

  async execute(input: CreateSessionInputModel): Promise<SessionModel> {
    const patientId = assertRequiredStringField(input, 'patientId');
    const psychologistId = assertRequiredStringField(input, 'psychologistId');
    const sessionDate =
      assertOptionalValidDateField(input, 'sessionDate') ?? new Date();

    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new Error(errorMessages.patientNotFound(patientId));
    }

    if (patient.psychologistId !== psychologistId) {
      throw new Error(errorMessages.patientDoesNotBelongToPsychologist);
    }

    const session: SessionModel = {
      id: randomUUID(),
      patientId,
      psychologistId,
      sessionDate,
      rawInputText: normalizeOptionalStringField(input, 'rawInputText'),
      status: SessionStatusEnum.Created,
      createdAt: new Date()
    };

    const createdSession = await this.sessionRepository.create(session);

    await this.auditLogRepository.create({
      id: randomUUID(),
      userId: psychologistId,
      action: AuditActionEnum.Create,
      entityType: AuditEntityTypeEnum.Session,
      entityId: createdSession.id,
      createdAt: new Date()
    });

    return createdSession;
  }
}
