import { SAYFORME_TOKEN_KEY } from "config";
import { decode, JwtPayload } from "jsonwebtoken";
import { HandleResponseT } from ".";

export default function handleResponse({
  status,
  data,
  setIsLoading,
  router,
  setErrorMessage,
}: HandleResponseT) {
  if (status.startsWith("2")) {
    localStorage.setItem(SAYFORME_TOKEN_KEY, data);
    const { role } = decode(data) as SignAndGetTokenT & JwtPayload;
    setIsLoading(false);
    return role === "ADMIN" ? router.push("/users") : router.push("/bookings");
  }
  setErrorMessage(data);
  return setIsLoading(false);
}
