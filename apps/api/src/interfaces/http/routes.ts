import { Router } from 'express';
import { clinicalNotesController } from './controllers/clinical-notes.controller.js';
import { patientsController } from './controllers/patients.controller.js';
import { sessionsController } from './controllers/sessions.controller.js';

export const routes = Router();

routes.post('/patients', patientsController.create);
routes.get('/patients', patientsController.list);
routes.post('/sessions', sessionsController.create);
routes.post('/sessions/:id/generate-note', sessionsController.generateClinicalNote);
routes.patch('/clinical-notes/:id', clinicalNotesController.update);
routes.post('/clinical-notes/:id/approve', clinicalNotesController.approve);
routes.get('/clinical-notes/:id/pdf', clinicalNotesController.exportPdf);
