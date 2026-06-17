import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { getTranscribeAudioUseCase } from '../../infrastructure/di/container.js';

export function registerAudioTranscriptionTool(server: McpServer): void {
  server.registerTool(
    'transcribe_audio',
    {
      title: 'Transcribe audio',
      description: 'Mock audio transcription tool for CliniNote MVP.',
      inputSchema: {
        audioFilePath: z.string().min(1),
        language: z.string().min(1)
      }
    },
    async (input) => {
      const useCase = await getTranscribeAudioUseCase();
      const result = await useCase.execute(input);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result)
          }
        ]
      };
    }
  );
}
