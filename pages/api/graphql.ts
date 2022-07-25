import { NextApiRequest, NextApiResponse } from "next";
import apolloServer from "utils/api/graphql/server";

const startedServer = apolloServer.start()
export default async function graphqlHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startedServer
  return await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = { api: { bodyParser: false } };
