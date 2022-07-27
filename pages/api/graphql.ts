import { envVariables } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import apolloServer from "utils/api/graphql/server";

const startedServer = apolloServer.start();
export default async function graphqlHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return !req.headers.authorization
    ? res.status(403).json({ code: 403, message: "Forbidden.", type: "error" })
    : !(await import("jsonwebtoken")).verify(
        req.headers.authorization!.replace("Bearer ", ""),
        envVariables.tokenSecret
      )
    ? res.status(403).json({ code: 403, message: "Forbidden.", type: "error" })
    : (await startedServer,
      await apolloServer.createHandler({ path: "/api/graphql" })(req, res));
}

export const config = { api: { bodyParser: false } };
