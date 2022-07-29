import Member from "@/models/member";
import CallBooking from "@/models/callBooking";
import { NextApiResponse } from "next";
import { MicroRequest } from "apollo-server-micro/dist/types";
import startDb from "utils/db";
import verifyJwtToken from "utils/verifyJwtToken";

export type GqlContext = {
  Member: typeof Member;
  CallBooking: typeof CallBooking;
  token: string;
  payload: SignAndGetTokenT;
  res: NextApiResponse;
};

type GqlContextArgs = {
  req: MicroRequest;
  res: NextApiResponse;
};

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
