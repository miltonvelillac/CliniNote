import type { AuditActionEnum } from '../enums/audit-action.enum.js';
import type { AuditEntityTypeEnum } from '../enums/audit-entity-type.enum.js';

export type AuditLogModel = {
  id: string;
  userId: string;
  action: AuditActionEnum;
  entityType: AuditEntityTypeEnum;
  entityId: string;
  createdAt: Date;
};
