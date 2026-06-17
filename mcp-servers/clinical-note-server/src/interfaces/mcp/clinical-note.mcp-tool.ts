import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { getGenerateClinicalNoteUseCase } from '../../infrastructure/di/container.js';

export function registerClinicalNoteTool(server: McpServer): void {
  server.registerTool(
    'generate_clinical_note',
    {
      title: 'Generate clinical note',
      description: 'Mock structured clinical note generation tool for CliniNote MVP.',
      inputSchema: {
        sessionSummary: z.string().min(1),
        template: z.string().min(1),
        language: z.string().min(1)
      }
    },
    async (input) => {
      const useCase = await getGenerateClinicalNoteUseCase();
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
