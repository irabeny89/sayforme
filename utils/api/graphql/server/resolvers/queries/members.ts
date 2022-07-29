import type { GqlContext } from "../../context";
import { ApolloError, ForbiddenError } from "apollo-server-micro";
import { error5xx } from "config";

async function handleRequest(Member: GqlContext["Member"], role: RoleT) {
  if (role !== "ADMIN") throw new ForbiddenError(error5xx);
  return (await Member.find().select("-hashedPassword -salt").exec()) ?? [];
}

function handleError(error: any) {
  console.error(error);
  throw new ApolloError(error5xx);
}

export default async function members(
  _: any,
  __: any,
  { Member, payload: { role } }: GqlContext
) {
  try {
    return await handleRequest(Member, role);
  } catch (error) {
    handleError(error);
  }
}
