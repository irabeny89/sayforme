import { NextApiRequest, NextApiResponse } from "next";
import validateRequestBody from "utils/validateObjectFields";
import { error4xx } from "config";
import handleRequest from "./handleRegisterRequest";

export default async function registerHandler(
  { body, method }: NextApiRequest,
  res: NextApiResponse
) {
  if (
    method == "POST" &&
    validateRequestBody(body, ["username", "email", "password"])
  )
    return await handleRequest(body, res);

  return res.status(400).end(error4xx);
}
