import { AuditLogRepositoryPort } from "@clininote/api/application/ports/audit-log-repository.port.js";
import { AuditLogModel } from "@clininote/api/domain/entities/audit-log.js";

export class InMemoryAuditLogRepository implements AuditLogRepositoryPort {
  private readonly clinicalNotes = new Map<string, AuditLogModel>();
    async create(note: AuditLogModel): Promise<AuditLogModel> {
    this.clinicalNotes.set(note.id, note);
    return note;
  }
}
