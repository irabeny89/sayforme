import { createHmac } from "crypto";

export default function hashPassword(password: string, salt: string) {
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return { hashedPassword, salt };
}
