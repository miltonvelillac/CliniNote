import type { TranscribeAudioInputModel } from '../../application/models/transcribe-audio-input.model.js';
import type { AudioTranscriberPort } from '../../application/ports/audio-transcriber.port.js';
import type { TranscriptionModel } from '../../domain/models/transcription.model.js';

export class MockAudioTranscriberAdapter implements AudioTranscriberPort {
  async transcribe(input: TranscribeAudioInputModel): Promise<TranscriptionModel> {
    const audioFileName =
      input.audioFilePath.split(/[\\/]/).pop() ?? 'audio file';
    const language = input.language.trim() || 'en';

    return {
      transcription: `[mock:${language}] Transcription generated from ${audioFileName}. The patient reports the main session summary verbally. Requires professional review.`
    };
  }
}
