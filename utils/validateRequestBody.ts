export default function validateRequestBody(body: object, fields: string[]) {
  return fields.every((field) => field in body);
}
