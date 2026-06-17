import type { PdfGeneratorPort } from '../../../application/ports/pdf-generator.port.js';

export class MockPdfGeneratorAdapter implements PdfGeneratorPort {
  async generatePdf(input: {
    clinicalNoteId: string;
    html: string;
  }): Promise<{ filePath: string }> {
    return {
      filePath: `mock-pdfs/clinical-note-${input.clinicalNoteId}.pdf`
    };
  }
}
