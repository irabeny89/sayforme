import { ApolloError, ForbiddenError } from "apollo-server-micro";
import { error5xx } from "config";
import type { GqlContext, MemberModelT } from "typings/mixTypes";

async function handleRequest(
  Member: MemberModelT,
  role: RoleT,
  userId: string
) {
  if (role !== "ADMIN") throw new ForbiddenError(error5xx);
  const operator = await Member.findByIdAndUpdate(userId, {
    $set: { role: "OPERATOR" },
  })
    .select("id")
    .exec();
  return operator?.id;
}

function handleError(error: any) {
  console.error(error);
  throw new ApolloError(error5xx);
}

export default async function authorizeUser(
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
