import { NextApiRequest, NextApiResponse } from "next";
import validateRequestBody from "utils/validateRequestBody";
import { error4xx, error5xx } from "config";
import signAndGetToken from "utils/signAndGetToken";
import hashPassword from "utils/hashPassword";

function handleRequestError(error: any, res: NextApiResponse) {
  console.error(error);
  res.status(500).end(error5xx);
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
    member.hashedPassword === hashPassword(password, member.salt).hashedPassword
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

    return handleResponse(member, password, res);
  } catch (error) {
    handleRequestError(error, res);
  }
}

export default function loginHandler(
  { body, method }: NextApiRequest,
  res: NextApiResponse
) {
  if (method == "POST" && validateRequestBody(body, ["email", "password"]))
    return handleRequest(body, res);

  return res.status(400).end(error4xx);
}
