import { ApolloError } from "apollo-server-micro";
import { error5xx } from "config";
import type { CallBookingModelT, GqlContext } from "typings/mixTypes";

async function handleRequest(
  CallBooking: CallBookingModelT,
  bookingId: string
) {
  return await CallBooking.findById(bookingId)
    .populate("owner")
    .populate("handler")
    .exec();
}

function handleError(error: any) {
  console.error(error);
  throw new ApolloError(error5xx);
}

export default async function getCallBooking(
  _: any,
  { bookingId }: Record<"bookingId", string>,
  { CallBooking }: GqlContext
) {
  try {
    return await handleRequest(CallBooking, bookingId);
  } catch (error) {
    handleError(error);
  }
}
