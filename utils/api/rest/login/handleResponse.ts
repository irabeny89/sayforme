import { error4xx } from "config";
import { NextApiResponse } from "next";
import hashPassword from "utils/api/rest/hashPassword";
import signAndGetToken from "utils/api/rest/register/signAndGetToken";
import verifyPassword from "./verifyPassword";

export default async function handleResponse(
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
