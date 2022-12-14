import { ApolloError } from "apollo-server-micro";
import { error5xx } from "config";
import { GqlContext, MemberModelT } from "typings/mixTypes";

async function handleRequest(Member: MemberModelT, email: string) {
  return await Member.findOne({ email }).select("-hashedPassword -salt").exec();
}
function handleError(error: any) {
  console.error(error);
  throw new ApolloError(error5xx);
}

export default async function whoami(
  _: any,
  __: any,
  { Member, payload: { email } }: GqlContext
) {
  try {
    return await handleRequest(Member, email);
  } catch (error) {
    handleError(error);
  }
}
