import Member from "@/models/member";
import CallBooking from "@/models/callBooking";
import startDb from "utils/db";
import verifyJwtToken from "utils/verifyJwtToken";
import type { GqlContext, GqlContextArgs } from "typings/mixTypes";

const context = async ({
  req: { headers },
  res,
}: GqlContextArgs): Promise<GqlContext> => {
  // this request has been verified from /api/graphql route, therefore, it is auth'd & exist
  const token = headers?.authorization?.replace("Bearer ", "") as string,
    payload = verifyJwtToken(token) as SignAndGetTokenT;

  await startDb();
  return {
    Member,
    CallBooking,
    token,
    payload,
    res,
  };
};

export default context;
