import { NextApiRequest, NextApiResponse } from "next";
import apolloServer from "utils/graphql/server";

export default async function graphqlHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await apolloServer.start()
  return await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = { api: { bodyParser: false } };
