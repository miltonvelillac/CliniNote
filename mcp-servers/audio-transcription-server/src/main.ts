export type TranscribeAudioInput = {
  audioFilePath: string;
  language: string;
};

export async function transcribeAudio(
  _input: TranscribeAudioInput
): Promise<{ transcription: string }> {
  throw new Error('transcribe_audio MCP tool is not implemented yet.');
}
