export default function (dateString: string) {
  return new Date(+dateString).toDateString();
}
