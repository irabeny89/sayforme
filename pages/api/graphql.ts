import { envVariables } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import apolloServer from "utils/api/graphql/server";

const startedServer = apolloServer.start();
export default async function graphqlHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.replace("Bearer ", ""),
    verified =
      token &&
      (await import("jsonwebtoken")).verify(token, envVariables.tokenSecret);

  return verified
    ? (await startedServer,
      await apolloServer.createHandler({ path: "/api/graphql" })(req, res))
    : res.status(403).json({ code: 403, message: "Forbidden.", type: "error" });
}

export const config = { api: { bodyParser: false } };
