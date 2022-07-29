import type { GqlContext } from "../../context";
import { ApolloError } from "apollo-server-micro";
import { error5xx } from "config";

async function handleRequest(
  owner: string,
  CallBooking: GqlContext["CallBooking"],
  booking: CallBookingInputT
) {
  const { id } = await CallBooking.create({ ...booking, owner });
  return id;
}

function handleError(error: any) {
  console.error(error);
  throw new ApolloError(error5xx);
}

export default async function addCallBooking(
  _: any,
  { booking }: BookingFormQueryVariablesT,
  { CallBooking, payload: { userId } }: GqlContext
) {
  try {
    return await handleRequest(userId, CallBooking, booking);
  } catch (error) {
    handleError(error);
  }
}
