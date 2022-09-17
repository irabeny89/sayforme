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
  ) : !data?.callBookings.length ? (
    <small>
      <i>No booking yet</i>
    </small>
  ) : (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-compact w-full">
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
    </div>
  );
}
