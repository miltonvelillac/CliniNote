import { domainErrors } from '../errors/domain-error.js';
import { errorMessages } from '../messages/error-messages.js';

type StringFieldName<TModel> = {
  [TKey in keyof TModel]-?: NonNullable<TModel[TKey]> extends string
    ? TKey
    : never;
}[keyof TModel] &
  string;

type DateFieldName<TModel> = {
  [TKey in keyof TModel]-?: NonNullable<TModel[TKey]> extends Date
    ? TKey
    : never;
}[keyof TModel] &
  string;

export function assertRequiredString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string') {
    throw domainErrors.badRequest(errorMessages.required(fieldName));
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw domainErrors.badRequest(errorMessages.required(fieldName));
  }

  return normalizedValue;
}

export function assertRequiredStringField<
  TModel extends object,
  TFieldName extends StringFieldName<TModel>
>(model: TModel, fieldName: TFieldName): string {
  return assertRequiredString(model[fieldName], fieldName);
}

export function normalizeOptionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const normalizedValue = String(value).trim();
  return normalizedValue || undefined;
}

export function normalizeOptionalStringField<
  TModel extends object,
  TFieldName extends StringFieldName<TModel>
>(model: TModel, fieldName: TFieldName): string | undefined {
  return normalizeOptionalString(model[fieldName]);
}

export function assertOptionalValidDate(
  value: Date | undefined,
  fieldName: string
): Date | undefined {
  if (!value) {
    return undefined;
  }

  if (Number.isNaN(value.getTime())) {
    throw domainErrors.badRequest(errorMessages.invalidDate(fieldName));
  }

  return value;
}

export function assertOptionalValidDateField<
  TModel extends object,
  TFieldName extends DateFieldName<TModel>
>(model: TModel, fieldName: TFieldName): Date | undefined {
  return assertOptionalValidDate(model[fieldName] as Date | undefined, fieldName);
}

export function assertAtLeastOneStringFieldDefined<
  TModel extends object,
  TFieldName extends StringFieldName<TModel>
>(
  model: TModel,
  fieldNames: readonly TFieldName[],
  message: string
): void {
  const hasValue = fieldNames.some(
    (fieldName) => normalizeOptionalStringField(model, fieldName) !== undefined
  );

  if (!hasValue) {
    throw domainErrors.badRequest(message);
  }
}
