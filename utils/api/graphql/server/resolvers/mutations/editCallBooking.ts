import { ApolloError } from "apollo-server-micro";
import { error5xx } from "config";
import type { EditBookingHandlerArgsT, GqlContext } from "typings/mixTypes";

async function handleRequest({
  CallBooking,
  booking,
  bookingId: id,
  userId: owner,
}: EditBookingHandlerArgsT) {
  const update = await CallBooking.findOneAndUpdate(
    { id, owner },
    {
      $set: booking,
    }
  )
    .select("id")
    .exec();
  return update?.id;
}

function handleError(error: any) {
  console.error(error);
  throw new ApolloError(error5xx);
}

export default async function editCallBooking(
  _: any,
  {
    bookingId,
    booking,
  }: BookingFormQueryVariablesT & Record<"bookingId", string>,
  { CallBooking, payload: { userId } }: GqlContext
) {
  try {
    return await handleRequest({ CallBooking, booking, bookingId, userId });
  } catch (error) {
    handleError(error);
  }
}
