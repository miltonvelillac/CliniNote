import type { SessionRepositoryPort } from '../../../application/ports/session-repository.port.js';
import type { SessionModel } from '../../../domain/entities/session.js';

export class InMemorySessionRepository implements SessionRepositoryPort {
  private readonly sessions = new Map<string, SessionModel>();

  async create(session: SessionModel): Promise<SessionModel> {
    this.sessions.set(session.id, session);
    return session;
  }

  async findById(id: string): Promise<SessionModel | null> {
    return this.sessions.get(id) ?? null;
  }

  async update(session: SessionModel): Promise<SessionModel> {
    if (!this.sessions.has(session.id)) {
      throw new Error(`Session with id ${session.id} was not found.`);
    }

    this.sessions.set(session.id, session);
    return session;
  }
}
