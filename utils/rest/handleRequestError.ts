import { error4xx, error5xx } from "config";
import { NextApiResponse } from "next";

/**
 * It handles errors thrown when handling the registration request.
 * @param error error thrown by server
 * @param res Nextjs response object for next response due to error
 * @returns returns updated response object as a result of the error
 */
export default function handleRequestError(error: any, res: NextApiResponse) {
  console.error(error);
  return error.code === 11000 || error.message.includes("validation failed")
    ? res.status(406).end(error4xx)
    : res.status(500).end(error5xx);
}
