export enum DomainErrorKindEnum {
  BadRequest = 'bad_request',
  NotFound = 'not_found',
  Forbidden = 'forbidden',
  Conflict = 'conflict'
}

export class DomainError extends Error {
  constructor(
    public readonly kind: DomainErrorKindEnum,
    message: string
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export const domainErrors = {
  badRequest: (message: string) =>
    new DomainError(DomainErrorKindEnum.BadRequest, message),
  notFound: (message: string) =>
    new DomainError(DomainErrorKindEnum.NotFound, message),
  forbidden: (message: string) =>
    new DomainError(DomainErrorKindEnum.Forbidden, message),
  conflict: (message: string) =>
    new DomainError(DomainErrorKindEnum.Conflict, message)
} as const;
