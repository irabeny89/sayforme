import type { GqlContext } from "../../context";
import { ApolloError, ForbiddenError } from "apollo-server-micro";
import { error5xx } from "config";

type HandleRequestArgT = Record<"role" | "bookingId" | "userId", string> &
  Pick<GqlContext, "CallBooking">;
async function handleRequest({
  CallBooking,
  bookingId,
  role,
  userId: handler,
}: HandleRequestArgT) {
  if (role === "CUSTOMER") throw new ForbiddenError(error5xx);
  const update = await CallBooking.findByIdAndUpdate(bookingId, {
    $set: { handler },
  })
    .select("id")
    .exec();
  return update?.id;
}

function handleError(error: any) {
  console.error(error);
  throw new ApolloError(error5xx);
}

export default async function handleCallBooking(
  _: any,
  { bookingId }: Record<"bookingId", string>,
  { CallBooking, payload: { role, userId } }: GqlContext
) {
  try {
    return await handleRequest({ CallBooking, bookingId, role, userId });
  } catch (error) {
    handleError(error);
  }
}
