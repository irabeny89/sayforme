import { sign } from "jsonwebtoken";

export default function signAndGetToken(payload: SignAndGetTokenT) {
  return sign(payload, process.env.ENCRYPT_SECRET!);
}
