import { NextApiRequest, NextApiResponse } from "next";
import validateRequestBody from "utils/validateRequestBody";
import { error4xx, error5xx } from "config";
import signAndGetToken from "utils/signAndGetToken";
import hashPassword from "utils/hashPassword";
/**
 * It handles errors thrown when handling the login request.
 * @param error error thrown by server
 * @param res Nextjs response object for next response due to error
 * @returns returns updated response object as a result of the error
 */
function handleRequestError(error: any, res: NextApiResponse) {
  console.error(error);
  return res.status(500).end(error5xx);
}

async function verifyPassword(hashedPass1: string, hashedPass2: string) {
  return (await import("crypto")).timingSafeEqual(
    Buffer.from(hashedPass1),
    Buffer.from(hashedPass2)
  );
}

async function handleResponse(
  member: Pick<
    MemberT,
    "hashedPassword" | "email" | "username" | "role" | "salt"
  > | null,
  password: string,
  res: NextApiResponse
) {
  return member &&
    (await verifyPassword(
      member.hashedPassword,
      hashPassword(password, member.salt).hashedPassword
    ))
    ? res.status(200).end(
        signAndGetToken({
          email: member.email,
          username: member.username,
          role: member.role,
        })
      )
    : res.status(400).end(error4xx);
}

async function handleRequest(
  { email, password }: Record<"email" | "password", string>,
  res: NextApiResponse
) {
  try {
    // start db connection
    await (await import("utils/db")).default();
    const member = await (await import("utils/db/models/member")).default
      .findOne({ email })
      .lean()
      .select("hashedPassword salt email username role")
      .exec();

    return await handleResponse(member, password, res);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export default async function loginHandler(
  { body, method }: NextApiRequest,
  res: NextApiResponse
) {
  if (method == "POST" && validateRequestBody(body, ["email", "password"]))
    return await handleRequest(body, res);

  return res.status(400).end(error4xx);
}
