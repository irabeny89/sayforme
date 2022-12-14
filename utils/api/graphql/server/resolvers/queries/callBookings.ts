import { ApolloError } from "apollo-server-micro";
import { error5xx } from "config";
import type { BookingHandlerArgsT, GqlContext } from "typings/mixTypes";

async function handleRequest({
  CallBooking,
  role,
  userId: owner,
}: BookingHandlerArgsT) {
  if (role === "CUSTOMER")
    return await CallBooking.find({ owner }).populate("owner handler").exec();
  return (await CallBooking.find().populate("owner handler").exec()) ?? [];
}

function handleError(error: any) {
  console.error(error);
  throw new ApolloError(error5xx);
}

export default async function callBookings(
  _: any,
  __: any,
  { CallBooking, payload: { role, userId } }: GqlContext
) {
  try {
    return await handleRequest({ CallBooking, role, userId });
  } catch (error) {
    handleError(error);
  }
}
