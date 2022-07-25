import { sign } from "jsonwebtoken";
import { envVariables } from "config";

export default function signAndGetToken(payload: SignAndGetTokenT) {
  return sign(payload, envVariables.tokenSecret);
}
