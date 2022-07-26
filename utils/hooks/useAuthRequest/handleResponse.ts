import { SAYFORMETOKEN } from "config";
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
    localStorage.setItem(SAYFORMETOKEN, data);
    const { role } = decode(data) as SignAndGetTokenT & JwtPayload;
    setIsLoading(false);
    return role === "ADMIN" ? router.push("/users") : router.push("/bookings");
  }
  setErrorMessage(data);
  return setIsLoading(false);
}
