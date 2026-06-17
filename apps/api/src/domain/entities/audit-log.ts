export enum AuditActionEnum {
  Create = 'create',
  Update = 'update',
  Transcribe = 'transcribe',
  Generate = 'generate',
  Approve = 'approve',
  Export = 'export'
}

export enum AuditEntityTypeEnum {
  Patient = 'Patient',
  Session = 'Session',
  ClinicalNote = 'ClinicalNote'
}

export type AuditLogModel = {
  id: string;
  userId: string;
  action: AuditActionEnum;
  entityType: AuditEntityTypeEnum;
  entityId: string;
  createdAt: Date;
};
