export default function createDateString (dateString: string) {
  return new Date(+dateString).toUTCString();
}
