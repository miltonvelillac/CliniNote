# CliniNote Roadmap

This roadmap splits the project into small steps so we can move forward incrementally.

## Step 1: Monorepo Base

Status: completed.

Goal: have a clear and buildable project structure.

- [x] Validate the final structure.
- [x] Adjust `dev`, `build`, and `test` scripts.
- [x] Confirm that `apps/web`, `apps/api`, and `mcp-servers/*` compile.
- [x] Add `.env.example`.

## Step 2: Backend MVP Skeleton

Status: completed.

Goal: create a clean API using hexagonal architecture.

- [x] Create initial use cases:
  - [x] `CreatePatient`
  - [x] `CreateSession`
  - [x] `GenerateClinicalNote`
  - [x] `UpdateClinicalNote`
  - [x] `ApproveClinicalNote`
  - [x] `ExportClinicalNotePdf`
- [x] Create HTTP controllers by module.
- [x] Create basic dependency injection.
- [x] Use in-memory repositories temporarily to move quickly.

## Step 3: Domain Model

Status: completed.

Goal: define core rules without a real database yet.

- [x] Refine entities:
  - [x] `UserModel`
  - [x] `PatientModel`
  - [x] `SessionModel`
  - [x] `ClinicalNoteModel`
  - [x] `AuditLogModel`
- [x] Separate domain enums:
  - [x] `UserRoleEnum`
  - [x] `SessionStatusEnum`
  - [x] `ClinicalNoteStatusEnum`
  - [x] `AuditActionEnum`
  - [x] `AuditEntityTypeEnum`
- [x] Move application input/result models out of `domain/entities`.
- [x] Add basic validations.
- [x] Define session and note states.
- [x] Ensure AI only generates drafts and never approves final notes.

## Step 4: Functional API Without Database

Status: completed.

Goal: test the full flow using in-memory data.

- [x] `POST /patients`
- [x] `GET /patients`
- [x] `POST /sessions`
- [x] `POST /sessions/:id/generate-note`
- [x] `PATCH /clinical-notes/:id`
- [x] `POST /clinical-notes/:id/approve`
- [x] `GET /clinical-notes/:id/pdf`
- [x] Register in-memory audit logs for each action.
- [x] Add manual API test documentation.
- [x] Improve HTTP error status mapping.

## Step 5: MCP Server Stubs

Goal: integrate the flow without real AI yet.

- `clinical-note-server`: generate a structured mock note.
- `audio-transcription-server`: return a mock transcription.
- API calls those ports as if they were external services.
- Keep prompts inside the clinical note MCP server.

## Step 6: Frontend Shell

Goal: create the base Angular navigation.

- Main layout.
- Lazy routes:
  - login
  - patients
  - sessions
  - clinical note editor
- Basic Atomic Design components:
  - buttons
  - inputs
  - form panels
- Initial store with NgRx Signals.

## Step 7: Main UI Flow

Goal: use the app manually from end to end.

- Create patient.
- Create session.
- Write summary.
- Generate note.
- Edit fields.
- Approve note.
- Export PDF.

## Step 8: Real Persistence

Goal: replace in-memory repositories with a database.

- Choose PostgreSQL or SQL Server.
- Add migrations.
- Implement real repository adapters.
- Keep use cases intact.

## Step 9: Auth

Goal: implement MVP login.

- Register or seed a psychologist user.
- Login with JWT.
- Auth middleware.
- Associate patients and sessions with the authenticated psychologist.

## Step 10: PDF

Goal: export an approved note.

- Implement `PdfGeneratorPort` adapter.
- Use PDFKit or Puppeteer.
- Create a simple and professional template.
- Block export when the note is not approved.

## Step 11: Real AI

Goal: replace mocks with real integrations.

- Clinical note MCP calls the LLM.
- Audio MCP calls the real transcription service.
- Validate clinical prompt rules.
- Handle errors and incomplete responses.

## Step 12: Security And MVP Closure

Goal: add the minimum hardening needed for the MVP.

- Validation with Zod.
- Environment variables.
- Controlled CORS.
- Logs without sensitive data.
- Persistent audit logs.
- Tests for critical use cases.

## Recommended Next Step

Continue with **Step 5: MCP Server Stubs**, because the in-memory HTTP flow is now working end to end.
