export default function createHtmlInputDateTimeValue(dateTime: number) {
  return new Date(dateTime).toISOString().slice(0, -8);
}
