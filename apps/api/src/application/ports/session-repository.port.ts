import { SessionModel } from '../../domain/entities/session.js';

export interface SessionRepositoryPort {
  create(session: SessionModel): Promise<SessionModel>;
  findById(id: string): Promise<SessionModel | null>;
  update(session: SessionModel): Promise<SessionModel>;
}
