import { Session } from '../../domain/entities/session.js';

export interface SessionRepositoryPort {
  create(session: Session): Promise<Session>;
  findById(id: string): Promise<Session | null>;
  update(session: Session): Promise<Session>;
}
