export interface AudioTranscriptionPort {
  transcribeAudio(input: {
    audioFilePath: string;
    language: string;
  }): Promise<{ transcription: string }>;
}
