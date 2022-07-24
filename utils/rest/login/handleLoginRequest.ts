import { NextApiResponse } from "next";
import handleRequestError from "utils/rest/handleRequestError";
import handleResponse from "./handleResponse";

export default async function handleRequest(
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