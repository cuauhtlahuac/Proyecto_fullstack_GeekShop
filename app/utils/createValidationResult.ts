import { type ZodError } from 'zod';

export function createValidationResult(error: ZodError) {
  const errors: Record<string, string> = {};
  for (const x of error.issues) {
    // zodV3+
    errors[x.path] = x.message;
  }
  return errors;
}
