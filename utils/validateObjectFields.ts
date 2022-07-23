/**
 * Validates an `object` by checking for the `fields` in it.
 * @param body the object to verify it `fields`.
 * @param fields the fields to be verified in the `object`.
 * @returns returns `true` if all `fields` are in the `object`.
 */
export default function validateObjectFields(body: object, fields: string[]) {
  return fields.every((field) => field in body);
}
