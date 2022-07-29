import type { GqlContext } from "../../context";
import { ApolloError, ForbiddenError } from "apollo-server-micro";
import { error5xx } from "config";

async function handleRequest(
  Member: GqlContext["Member"],
  role: RoleT,
  userId: string
) {
  if (role !== "ADMIN") throw new ForbiddenError(error5xx);
  const user = await Member.findByIdAndUpdate(userId, {
    $set: { role: "CUSTOMER" },
  })
    .select("id")
    .exec();
  return user?.id;
}

function handleError(error: any) {
  console.error(error);
  throw new ApolloError(error5xx);
}

export default async function denyUser(
  _: any,
  { userId }: Record<"userId", string>,
  { Member, payload: { role } }: GqlContext
) {
  try {
    return await handleRequest(Member, role, userId);
  } catch (error) {
    handleError(error);
  }
}
