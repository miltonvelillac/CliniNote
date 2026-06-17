import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getGenerateClinicalNoteUseCase } from './infrastructure/di/container.js';
import { registerClinicalNoteTool } from './interfaces/mcp/clinical-note.mcp-tool.js';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'clininote-clinical-note-server',
    version: '0.1.0'
  });

  registerClinicalNoteTool(server);

  return server;
}

export async function startMcpServer(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

async function runMockJson(): Promise<void> {
  const useCase = await getGenerateClinicalNoteUseCase();
  const result = await useCase.execute({
    sessionSummary:
      process.argv[3] ??
      'The patient reports sleep difficulties and work-related stress.',
    template: process.argv[4] ?? 'default',
    language: process.argv[5] ?? 'en'
  });

  console.log(JSON.stringify(result, null, 2));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === '--mock-json') {
    await runMockJson();
  } else {
    await startMcpServer();
  }
}
