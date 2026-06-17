# Project Context: Clinical Notes AI Assistant

## Goal

Build a web application that helps psychologists generate structured clinical notes or psychological history drafts after a consultation.

The system must not replace the psychologist. It only generates editable drafts. The psychologist is always responsible for reviewing, correcting, approving, and signing the final clinical note.

## Core Problem

Psychologists spend a lot of time after each session writing clinical notes, organizing patient information, describing the session, and filling institutional templates. The app should reduce documentation time by transforming a written or spoken session summary into a structured clinical note.

## MVP Scope

Initial MVP should be simple and focused.

### Included

* Psychologist login.
* Basic patient management.
* Create consultation/session.
* Input session summary as text.
* Generate structured clinical note using an LLM.
* Allow manual editing of every generated section.
* Mark note as approved by the psychologist.
* Export final note to PDF.

### Not included in first MVP

* Full session recording.
* Automatic diagnosis.
* EPS/health system integrations.
* Digital signature.
* Billing.
* Scheduling.
* Mobile app.

## Future Scope

* Upload or record short audio summary.
* Transcribe audio to text using Speech-to-Text.
* Review transcription before note generation.
* Custom clinical templates.
* Full session audio processing.
* Speaker separation.
* Supervisor role.
* Advanced audit logs.

## Suggested Architecture

```text
Angular Frontend
        ↓
Node.js / Express Backend
        ↓
Speech-to-Text Service
OpenAI Speech-to-Text or faster-whisper
        ↓
LLM Service
Clinical structuring and draft generation
        ↓
Database
PostgreSQL or SQL Server
        ↓
PDF Export
Puppeteer or PDFKit
```

## Main Workflow

```text
Psychologist logs in
        ↓
Creates or selects patient
        ↓
Creates a new consultation
        ↓
Writes session summary
        ↓
Backend sends summary to LLM
        ↓
LLM returns structured clinical fields
        ↓
Frontend shows editable clinical note draft
        ↓
Psychologist reviews and edits
        ↓
Psychologist approves final version
        ↓
System saves and exports PDF
```

## Clinical Note Template

The generated note should include:

```text
1. Consultation reason
2. Current problem description
3. Relevant background
4. Mental status / clinical observation
5. Initial case conceptualization
6. Intervention performed during session
7. Clinical impression
8. Intervention plan
9. Recommendations
10. Professional observations
```

## AI Rules

The LLM must:

* Generate only a draft.
* Avoid inventing information.
* Use professional and respectful clinical language.
* Distinguish between observed facts and patient-reported information.
* Avoid automatic diagnosis unless explicitly provided by the psychologist.
* Mark missing or insufficient information clearly.
* Never produce a final note without human review.

## Suggested Data Model

### users

```text
id
name
email
password_hash
role
created_at
```

### patients

```text
id
psychologist_id
full_name
document
birth_date
phone
created_at
```

### sessions

```text
id
patient_id
psychologist_id
session_date
raw_input_text
transcription_text
status
created_at
```

### clinical_notes

```text
id
session_id
consultation_reason
current_problem
background
mental_status
conceptualization
intervention
clinical_impression
plan
recommendations
professional_observations
final_text
approved_at
created_at
```

### audit_logs

```text
id
user_id
action
entity_type
entity_id
created_at
```

## Suggested Tech Stack

Frontend:

```text
Angular
TypeScript
Reactive Forms
```

Backend:

```text
Node.js
Express or NestJS
JWT Auth
```

Database:

```text
PostgreSQL or SQL Server
```

AI:

```text
OpenAI or Azure OpenAI for LLM
OpenAI Speech-to-Text or faster-whisper for audio transcription
```

PDF:

```text
Puppeteer or PDFKit
```

## Product Principle

The product promise is:

> Reduce clinical documentation time while keeping the psychologist in full control of the final clinical record.
