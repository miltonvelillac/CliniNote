import type { ClinicalNoteRepositoryPort } from '@clininote/api/application/ports/clinical-note-repository.port.js';
import type { ClinicalNoteModel } from '@clininote/api/domain/entities/clinical-note.js';

export class InMemoryClinicalNoteRepository implements ClinicalNoteRepositoryPort {
  private readonly clinicalNotes = new Map<string, ClinicalNoteModel>();

  async create(note: ClinicalNoteModel): Promise<ClinicalNoteModel> {
    this.clinicalNotes.set(note.id, note);
    return note;
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
      throw new Error(`Clinical note with id ${note.id} was not found.`);
    }

    this.clinicalNotes.set(note.id, note);
    return note;
  }
}
