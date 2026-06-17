import type { TranscribeAudioInputModel } from '../models/transcribe-audio-input.model.js';
import type { TranscriptionModel } from '../../domain/models/transcription.model.js';

export interface AudioTranscriberPort {
  transcribe(input: TranscribeAudioInputModel): Promise<TranscriptionModel>;
}
