import type { TranscribeAudioUseCase } from '../../application/use-cases/transcribe-audio.use-case.js';

let transcribeAudioUseCase: TranscribeAudioUseCase | undefined;

export async function getTranscribeAudioUseCase(): Promise<TranscribeAudioUseCase> {
  if (!transcribeAudioUseCase) {
    const [{ MockAudioTranscriberAdapter }, { TranscribeAudioUseCase }] =
      await Promise.all([
        import('../adapters/mock-audio-transcriber.adapter.js'),
        import('../../application/use-cases/transcribe-audio.use-case.js')
      ]);

    transcribeAudioUseCase = new TranscribeAudioUseCase(
      new MockAudioTranscriberAdapter()
    );
  }

  return transcribeAudioUseCase;
}
