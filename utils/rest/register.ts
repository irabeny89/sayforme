import { NextApiRequest, NextApiResponse } from "next";
import validateRequestBody from "utils/validateRequestBody";
import { error4xx, error5xx } from "config";
import signAndGetToken from "utils/signAndGetToken";
import hashPassword from "utils/hashPassword";
/**
 * It handles errors thrown when handling the registration request.
 * @param error error thrown by server
 * @param res Nextjs response object for next response due to error
 * @returns returns updated response object as a result of the error
 */
function handleRequestError(error: any, res: NextApiResponse) {
  console.error(error);
  return error.code === 11000 || error.message.includes("validation failed")
    ? res.status(406).end(error4xx)
    : res.status(500).end(error5xx);
}

async function handleRequest(
  { password, ...rest }: Record<"username" | "email" | "password", string>,
  res: NextApiResponse
) {
  try {
    // start db connection
    await (await import("utils/db")).default();

    const salt = (await import("crypto")).randomBytes(16).toString("hex"),
      hashNsalt = hashPassword(password, salt),
      // register user as new member or db throws error even when user already exist
      { email, username, role } = await (
        await import("utils/db/models/member")
      ).default.create({ ...rest, ...hashNsalt });

    return res.status(201).end(signAndGetToken({ email, username, role }));
  } catch (error: any) {
    handleRequestError(error, res);
  }
}

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
