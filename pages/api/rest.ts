import { error4xx } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import handlers from "utils/rest";

export default async function restHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.body?.action === "register" || req?.body?.action === "login") {
    const action = req.body.action as "register" | "login";
    return handlers[action](req, res);
  }
  return res.status(400).end(error4xx);
}
