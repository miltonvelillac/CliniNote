import type { TranscribeAudioInputModel } from '../models/transcribe-audio-input.model.js';
import type { AudioTranscriberPort } from '../ports/audio-transcriber.port.js';
import type { TranscriptionModel } from '../../domain/models/transcription.model.js';

export class TranscribeAudioUseCase {
  constructor(private readonly audioTranscriber: AudioTranscriberPort) {}

  async execute(input: TranscribeAudioInputModel): Promise<TranscriptionModel> {
    return this.audioTranscriber.transcribe(input);
  }
}
