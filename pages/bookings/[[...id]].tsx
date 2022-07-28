import { useRouter } from "next/router";
import Bookings from "utils/components/bookings";
import Booking from "utils/components/bookings/Booking";

export default function BookingRoutes() {
  const { query } = useRouter();
  return !Object.keys(query).length ? (
    <Bookings />
  ) : (
    <Booking bookingId={query.id as string} />
  );
}
