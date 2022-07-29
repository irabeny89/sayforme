import type { GqlContext } from "../../context";
import { ApolloError, ForbiddenError } from "apollo-server-micro";
import { error5xx } from "config";

type HandleRequestArgT = Record<"role" | "bookingId" | "userId", string> &
  Pick<GqlContext, "CallBooking"> &
  Partial<Record<"remark", string>>;

async function handleRequest({
  CallBooking,
  bookingId: id,
  role,
  remark,
  userId: handler,
}: HandleRequestArgT) {
  if (role === "CUSTOMER") throw new ForbiddenError(error5xx);
  const update = await CallBooking.findOneAndUpdate(
    { id, handler },
    {
      $set: { remark, status: "COMPLETE" },
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

export default async function completeCall(
  _: any,
  { bookingId, remark }: CompleteCallT,
  { CallBooking, payload: { role, userId } }: GqlContext
) {
  try {
    return await handleRequest({
      CallBooking,
      bookingId,
      role,
      userId,
      remark,
    });
  } catch (error) {
    handleError(error);
  }
}
