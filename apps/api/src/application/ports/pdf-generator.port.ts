export interface PdfGeneratorPort {
  generatePdf(input: {
    clinicalNoteId: string;
    html: string;
  }): Promise<{ filePath: string }>;
}
