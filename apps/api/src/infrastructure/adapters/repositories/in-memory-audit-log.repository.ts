import type { AuditLogRepositoryPort } from '../../../application/ports/audit-log-repository.port.js';
import type { AuditLogModel } from '../../../domain/entities/audit-log.js';

export class InMemoryAuditLogRepository implements AuditLogRepositoryPort {
  private readonly auditLogs = new Map<string, AuditLogModel>();

  async create(log: AuditLogModel): Promise<AuditLogModel> {
    this.auditLogs.set(log.id, log);
    return log;
  }
}
