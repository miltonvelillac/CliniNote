import type { ClinicalNoteRepositoryPort } from '@clininote/api/application/ports/clinical-note-repository.port.js';
import type { ClinicalNoteModel } from '@clininote/api/domain/entities/clinical-note.js';
import { errorMessages } from '@clininote/api/domain/messages/error-messages.js';

export class InMemoryClinicalNoteRepository implements ClinicalNoteRepositoryPort {
  private readonly clinicalNotes = new Map<string, ClinicalNoteModel>();

  async create(note: ClinicalNoteModel): Promise<ClinicalNoteModel> {
    this.clinicalNotes.set(note.id, note);
    return note;
  }

  async findById(id: string): Promise<ClinicalNoteModel | null> {
    return this.clinicalNotes.get(id) ?? null;
  }

  async findBySessionId(sessionId: string): Promise<ClinicalNoteModel | null> {
    return (
      [...this.clinicalNotes.values()].find(
        (note) => note.sessionId === sessionId
      ) ?? null
    );
  }

  async update(note: ClinicalNoteModel): Promise<ClinicalNoteModel> {
    if (!this.clinicalNotes.has(note.id)) {
      throw new Error(errorMessages.clinicalNoteNotFound(note.id));
    }

    this.clinicalNotes.set(note.id, note);
    return note;
  }
}
