# API Manual Test

Use these requests to test the in-memory MVP flow.

Base URL:

```txt
http://localhost:3000
```

Use the same `psychologistId` through the whole flow:

```txt
psychologist-1
```

## 1. Health Check

```http
GET /health
```

Expected status: `200`.

## 2. Create Patient

```http
POST /api/patients
Content-Type: application/json

{
  "psychologistId": "psychologist-1",
  "fullName": "Ana Maria Gomez",
  "document": "123456789",
  "birthDate": "1990-05-12",
  "phone": "+57 300 000 0000"
}
```

Expected status: `201`.

Save the returned `id` as `patientId`.

## 3. List Patients

```http
GET /api/patients?psychologistId=psychologist-1
```

Expected status: `200`.

## 4. Create Session

```http
POST /api/sessions
Content-Type: application/json

{
  "patientId": "<patientId>",
  "psychologistId": "psychologist-1",
  "sessionDate": "2026-06-17",
  "rawInputText": "The patient reports sleep difficulties and work-related stress. No diagnosis was provided."
}
```

Expected status: `201`.

Save the returned `id` as `sessionId`.

## 5. Generate Clinical Note

```http
POST /api/sessions/<sessionId>/generate-note
Content-Type: application/json

{
  "psychologistId": "psychologist-1",
  "template": "default",
  "language": "en"
}
```

Expected status: `201`.

Save the returned `id` as `clinicalNoteId`.

## 6. Update Clinical Note

```http
PATCH /api/clinical-notes/<clinicalNoteId>
Content-Type: application/json

{
  "psychologistId": "psychologist-1",
  "plan": "Continue assessment in the next session and review sleep hygiene habits.",
  "recommendations": "Patient will monitor sleep patterns before next appointment."
}
```

Expected status: `200`.

## 7. Approve Clinical Note

```http
POST /api/clinical-notes/<clinicalNoteId>/approve
Content-Type: application/json

{
  "psychologistId": "psychologist-1"
}
```

Expected status: `200`.

## 8. Export PDF

```http
GET /api/clinical-notes/<clinicalNoteId>/pdf?psychologistId=psychologist-1
```

Expected status: `200`.

The mock PDF adapter returns a JSON payload with a `filePath`.

## Useful Error Checks

Create patient without `fullName`:

Expected status: `400`.

Generate note twice for the same session:

Expected status: `409`.

Export a note before approval:

Expected status: `409`.

Use a different `psychologistId` for a patient/session/note:

Expected status: `403`.

Use a missing id:

Expected status: `404`.
