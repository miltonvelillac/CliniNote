export type AuditActionType =
  | 'create'
  | 'update'
  | 'transcribe'
  | 'generate'
  | 'approve'
  | 'export';

export type AuditLogModel = {
  id: string;
  userId: string;
  action: AuditActionType;
  entityType: string;
  entityId: string;
  createdAt: Date;
};
