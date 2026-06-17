# AGENTS.md

## CliniNote

Web app for psychologists to generate editable clinical note drafts from text summaries or audio. AI only drafts; the psychologist reviews, edits, approves, and signs.

## MVP

* Login
* Patients
* Sessions
* Text summary or audio upload
* Audio → text via MCP server
* Text → clinical note via MCP server
* Editable draft
* Approve note
* Export PDF
* Audit logs

## Stack

```txt
Angular + TypeScript
NgRx Signals Store
Atomic Design
Node.js + TypeScript
Express
Hexagonal Architecture
Ports & Adapters
Dependency Injection
Factories
Lazy loading
PostgreSQL or SQL Server
MCP servers
Puppeteer or PDFKit
```

## Structure

```txt
clininote/
  apps/
    web/
      src/
        app/
          core/
          shared/
          store/
          features/
          ui/
            atoms/
            molecules/
            organisms/
            templates/
    api/
      src/
        domain/
        application/
          ports/
          use-cases/
          factories/
        infrastructure/
          adapters/
          di/
          config/
        interfaces/
          http/
        mcp-host/
        main.ts
  mcp-servers/
    audio-transcription-server/
    clinical-note-server/
  docs/
```

## Frontend Rules

```txt
Use Angular standalone components.
Use NgRx Signals Store for state management.
Use Atomic Design for reusable UI.
Keep feature logic inside feature folders.
Keep generic UI components inside ui/.
Use lazy-loaded routes for features.
```

## Architecture

Use hexagonal architecture.

```txt
HTTP -> Use Case -> Port -> Adapter
```

Domain must not depend on:

```txt
Express
Database
MCP
OpenAI/LLM
PDF libraries
```

Use cases depend only on ports. Adapters implement ports. DI binds ports to adapters.

## Core Entities

```txt
UserModel
PatientModel
SessionModel
ClinicalNoteModel
AuditLogModel
```

## Naming Rules

```txt
All data models and TypeScript types that represent domain data must end with Model.
Use UserModel, PatientModel, SessionModel, ClinicalNoteModel, and AuditLogModel.
Avoid names like Session because they can conflict with framework, runtime, or library classes.
```

## Main Ports

```txt
UserRepositoryPort
PatientRepositoryPort
SessionRepositoryPort
ClinicalNoteRepositoryPort
AuditLogRepositoryPort
AudioTranscriptionPort
ClinicalNoteGeneratorPort
PdfGeneratorPort
```

## Main Use Cases

```txt
CreatePatient
CreateSession
TranscribeAudio
GenerateClinicalNote
UpdateClinicalNote
ApproveClinicalNote
ExportClinicalNotePdf
```

## MCP

Backend is the MCP Host.

### audio-transcription-server

Tool:

```txt
transcribe_audio(audioFilePath, language) -> transcription
```

### clinical-note-server

Tool:

```txt
generate_clinical_note(sessionSummary, template, language) -> structured note
```

## Clinical Note Fields

```txt
consultationReason
currentProblem
background
mentalStatus
conceptualization
intervention
clinicalImpression
plan
recommendations
professionalObservations
missingInformation
```

## AI Rules

```txt
Generate drafts only.
Do not invent facts.
Use respectful clinical language.
Separate observed facts from patient-reported info.
Do not diagnose unless explicitly provided.
Mark missing info as: "Not provided. Requires professional review."
Never approve final notes.
```

## Workflow

```txt
Login
-> Patient
-> Session
-> Text or Audio
-> If audio: transcribe via MCP
-> Generate note via MCP
-> Edit
-> Approve
-> Export PDF
```

## Dev Rules

```txt
Keep MVP small.
Use TypeScript.
Keep domain pure.
Use ports for external dependencies.
Use DI, factories, and lazy loading.
Keep prompts inside clinical-note MCP server.
Use env vars.
Validate inputs.
Audit create/update/transcribe/generate/approve/export.
Prioritize privacy and security.
```
