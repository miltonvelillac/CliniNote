import { errorMessages } from '../messages/error-messages.js';

export function assertRequiredString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string') {
    throw new Error(errorMessages.required(fieldName));
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error(errorMessages.required(fieldName));
  }

  return normalizedValue;
}

export function normalizeOptionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const normalizedValue = String(value).trim();
  return normalizedValue || undefined;
}

export function assertOptionalValidDate(
  value: Date | undefined,
  fieldName: string
): Date | undefined {
  if (!value) {
    return undefined;
  }

  if (Number.isNaN(value.getTime())) {
    throw new Error(errorMessages.invalidDate(fieldName));
  }

  return value;
}

export function assertAtLeastOneDefined(
  values: Record<string, unknown>,
  message: string
): void {
  const hasValue = Object.values(values).some(
    (value) => normalizeOptionalString(value) !== undefined
  );

  if (!hasValue) {
    throw new Error(message);
  }
}
