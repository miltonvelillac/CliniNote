export type AuditAction =
  | 'create'
  | 'update'
  | 'transcribe'
  | 'generate'
  | 'approve'
  | 'export';

export type AuditLog = {
  id: string;
  userId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  createdAt: Date;
};
