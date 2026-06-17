import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getTranscribeAudioUseCase } from './infrastructure/di/container.js';
import { registerAudioTranscriptionTool } from './interfaces/mcp/audio-transcription.mcp-tool.js';

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'clininote-audio-transcription-server',
    version: '0.1.0'
  });

  registerAudioTranscriptionTool(server);

  return server;
}

export async function startMcpServer(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

async function runMockJson(): Promise<void> {
  const useCase = await getTranscribeAudioUseCase();
  const result = await useCase.execute({
    audioFilePath: process.argv[3] ?? 'mock-audio.wav',
    language: process.argv[4] ?? 'en'
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
