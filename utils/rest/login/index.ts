import { NextApiRequest, NextApiResponse } from "next";
import validateRequestBody from "utils/validateObjectFields";
import { error4xx } from "config";
import handleRequest from "./handleLoginRequest";

export default async function loginHandler(
  { body, method }: NextApiRequest,
  res: NextApiResponse
) {
  if (method == "POST" && validateRequestBody(body, ["email", "password"]))
    return await handleRequest(body, res);

  return res.status(400).end(error4xx);
}
