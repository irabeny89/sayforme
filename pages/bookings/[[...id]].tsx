import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Bookings from "utils/components/bookings";

const Booking = dynamic(() => import("utils/components/bookings/Booking"));

export default function BookingRoutes() {
  const { query } = useRouter(),
    routeHasQueryParams = Object.keys(query).length,
    queryParams = query && (query.id as string[]);

  return !routeHasQueryParams ? (
    <Bookings />
  ) : (
    <Booking bookingId={queryParams[0]} />
  );
}
