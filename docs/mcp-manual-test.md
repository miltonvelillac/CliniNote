# MCP Manual Test

These commands test the current MCP server stubs without requiring the API host or a dedicated MCP client.

Each MCP server follows the same hexagonal shape:

```txt
MCP Tool -> Use Case -> Port -> Adapter
```

The current adapters are mocks and are wired through lazy dependency injection containers.

## Audio Transcription Server

Build:

```bash
npm run build -w @clininote/audio-transcription-server
```

Run as an MCP stdio server:

```bash
npm run dev:mcp:audio
```

Run mock JSON output:

```bash
node dist/mcp-servers/audio-transcription-server/main.js --mock-json session-audio.wav en
```

Expected shape:

```json
{
  "transcription": "[mock:en] Transcription generated from session-audio.wav. The patient reports the main session summary verbally. Requires professional review."
}
```

MCP tool:

```txt
transcribe_audio(audioFilePath, language) -> transcription
```

## Clinical Note Server

Build:

```bash
npm run build -w @clininote/clinical-note-server
```

Run as an MCP stdio server:

```bash
npm run dev:mcp:clinical-note
```

Run mock JSON output:

```bash
node dist/mcp-servers/clinical-note-server/main.js --mock-json "The patient reports sleep difficulties and work-related stress." default en
```

Expected shape:

```json
{
  "consultationReason": "...",
  "currentProblem": "...",
  "background": "Not provided. Requires professional review.",
  "mentalStatus": "Not provided. Requires professional review.",
  "conceptualization": "Not provided. Requires professional review.",
  "intervention": "Not provided. Requires professional review.",
  "clinicalImpression": "Not provided. Requires professional review.",
  "plan": "Not provided. Requires professional review.",
  "recommendations": "Not provided. Requires professional review.",
  "professionalObservations": "...",
  "missingInformation": "Not provided. Requires professional review."
}
```

MCP tool:

```txt
generate_clinical_note(sessionSummary, template, language) -> structured note
```

The clinical note prompt remains inside:

```txt
mcp-servers/clinical-note-server/src/prompts/clinical-note-system-prompt.ts
```
