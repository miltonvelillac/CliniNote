import { AuditLog } from '../../domain/entities/audit-log.js';

export interface AuditLogRepositoryPort {
  create(log: AuditLog): Promise<AuditLog>;
}
