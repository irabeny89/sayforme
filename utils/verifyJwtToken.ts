import { envVariables } from "config";
import { verify } from "jsonwebtoken";
/**
 * It verifies by decoding the JWT token and returns it as payload or returns a falsy value if passed as argument.
 * @param token the JWT token to verify.
 * @returns verified decoded token payload or falsy.
 */
export default function verifyJwtToken(token: string | null | undefined) {
  try {
    return token ? verify(token, envVariables.tokenSecret) : token;
  } catch (error) {
    console.error(error);
  }
}
