import { error4xx } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import handlers from "utils/rest";

/**
 * It handles all REST HTTP requests with `action` field in the request `body` and `POST` method only.
 * @param req HTTP request object decorated by Nextjs
 * @param res HTTP response object decorated by Nextjs
 * @returns request response object handled by Nextjs API.
 */
export default async function restHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.body?.action === "register" || req?.body?.action === "login") {
    const action = req.body.action as "register" | "login";
    // property accessor to select handler
    return handlers[action](req, res);
  }
  return res.status(400).end(error4xx);
}
