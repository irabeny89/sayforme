import Link from "next/link";
import createDateString from "utils/createDateString";

export default function BookingTableRow({
  callOn,
  id: bookingId,
  recipientLine,
  status,
  index,
}: BookingTableRowPropsT) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{status}</td>
      <td>{createDateString(callOn)}</td>
      <td>{recipientLine}</td>
      <td>
        <Link href={`/bookings/${bookingId}`}>View</Link>
      </td>
    </tr>
  );
}
