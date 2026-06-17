# CliniNote Roadmap

Este roadmap divide el proyecto en pasos pequenos para avanzar de forma incremental.

## Paso 1: Base del monorepo

Estado: completado.

Objetivo: tener una estructura compilable y clara.

- [x] Validar estructura final.
- [x] Ajustar scripts `dev`, `build`, `test`.
- [x] Confirmar que `apps/web`, `apps/api` y `mcp-servers/*` compilan.
- [x] Agregar `.env.example`.

## Paso 2: Backend MVP esqueleto

Objetivo: crear una API limpia con arquitectura hexagonal.

- Crear use cases iniciales:
  - `CreatePatient`
  - `CreateSession`
  - `GenerateClinicalNote`
  - `UpdateClinicalNote`
  - `ApproveClinicalNote`
  - `ExportClinicalNotePdf`
- Crear controladores HTTP por modulo.
- Crear DI basico.
- Usar repositorios en memoria temporalmente para avanzar rapido.

## Paso 3: Modelo de dominio

Objetivo: definir reglas centrales sin base de datos todavia.

- Refinar entidades:
  - `User`
  - `Patient`
  - `Session`
  - `ClinicalNote`
  - `AuditLog`
- Agregar validaciones basicas.
- Definir estados de sesion y nota.
- Asegurar que la IA solo genere borradores y nunca apruebe notas.

## Paso 4: API funcional sin base de datos

Objetivo: probar el flujo completo con datos en memoria.

- `POST /patients`
- `GET /patients`
- `POST /sessions`
- `POST /sessions/:id/generate-note`
- `PATCH /clinical-notes/:id`
- `POST /clinical-notes/:id/approve`
- `GET /clinical-notes/:id/pdf`
- Registrar auditoria en memoria para cada accion.

## Paso 5: MCP servers stub

Objetivo: integrar el flujo sin IA real todavia.

- `clinical-note-server`: generar nota mock estructurada.
- `audio-transcription-server`: devolver transcripcion mock.
- API llama esos puertos como si fueran servicios externos.
- Mantener prompts dentro del servidor MCP clinico.

## Paso 6: Frontend shell

Objetivo: crear navegacion base Angular.

- Layout principal.
- Rutas lazy:
  - login
  - patients
  - sessions
  - clinical note editor
- Atomic Design basico:
  - botones
  - inputs
  - paneles/formularios
- Store inicial con NgRx Signals.

## Paso 7: Flujo principal UI

Objetivo: usar la app manualmente de punta a punta.

- Crear paciente.
- Crear sesion.
- Escribir resumen.
- Generar nota.
- Editar campos.
- Aprobar nota.
- Exportar PDF.

## Paso 8: Persistencia real

Objetivo: reemplazar repositorios en memoria por base de datos.

- Elegir PostgreSQL o SQL Server.
- Agregar migraciones.
- Implementar adapters reales para repositories.
- Mantener use cases intactos.

## Paso 9: Auth

Objetivo: implementar login MVP.

- Registro o seed de usuario psicologo.
- Login con JWT.
- Middleware de auth.
- Asociar pacientes y sesiones al psicologo autenticado.

## Paso 10: PDF

Objetivo: exportar una nota aprobada.

- Implementar adapter `PdfGeneratorPort`.
- Usar PDFKit o Puppeteer.
- Crear plantilla simple y profesional.
- Bloquear exportacion si la nota no esta aprobada.

## Paso 11: IA real

Objetivo: reemplazar mocks por integraciones reales.

- Clinical note MCP llama al LLM.
- Audio MCP llama al servicio real de transcripcion.
- Validar reglas clinicas del prompt.
- Manejar errores y respuestas incompletas.

## Paso 12: Seguridad y cierre MVP

Objetivo: endurecer lo minimo necesario para el MVP.

- Validacion con Zod.
- Variables de entorno.
- CORS controlado.
- Logs sin datos sensibles.
- Auditoria persistente.
- Tests de use cases criticos.

## Siguiente paso recomendado

Continuar con el **Paso 2: Backend MVP esqueleto**, porque define el corazon del sistema antes de crecer la UI o conectar una base de datos real.
