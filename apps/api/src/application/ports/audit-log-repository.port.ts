import { AuditLogModel } from '../../domain/entities/audit-log.js';

export interface AuditLogRepositoryPort {
  create(log: AuditLogModel): Promise<AuditLogModel>;
}
