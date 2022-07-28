import Link from "next/link";

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
      <td>{callOn}</td>
      <td>{recipientLine}</td>
      <td>
        <Link href={`/bookings/${bookingId}`}>View</Link>
      </td>
    </tr>
  );
}
