import { useQuery } from "@apollo/client";
import { error5xx } from "config";
import { BOOKINGS_TABLE } from "utils/api/graphql/client/documentNode";
import BookingTableRow from "./BookingTableRow";

export default function BookingsTable() {
  const { loading, error, data } = useQuery<BookingsQueryT>(BOOKINGS_TABLE);

  return loading ? (
    <i>Loading...</i>
  ) : error ? (
    <i>{error5xx}</i>
  ) : (
    <small>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Call On</th>
            <th>Call Line</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.callBookings.map((booking, index) => (
            <BookingTableRow {...booking} index={index} key={booking.id} />
          ))}
        </tbody>
      </table>
    </small>
  );
}
