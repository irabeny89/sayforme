import { SAYFORMETOKEN } from "config";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { decode, JwtPayload } from "jsonwebtoken";

type CreateSendRequestT = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  router: NextRouter;
};

type HandleResponseT = CreateSendRequestT & Record<"status" | "data", string>;

function handleResponse({
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

function createSendRequest({
  setIsLoading,
  setErrorMessage,
  router,
}: CreateSendRequestT) {
  return async function sendRequest(request: AuthRequestT) {
    const res = await fetch("/api/rest", {
        method: "post",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(request),
      }),
      status = res.status + "",
      data = await res.text();
    handleResponse({ status, data, router, setErrorMessage, setIsLoading });
  };
}

function clearErrorMessage(setErrorMessage: Dispatch<SetStateAction<string>>) {
  return () => setErrorMessage("");
}

export default function useAuthRequest() {
  const [errorMessage, setErrorMessage] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    router = useRouter();

  useEffect(() => {
    const timerId = setTimeout(clearErrorMessage(setErrorMessage), 6e4);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  return {
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    sendRequest: createSendRequest({ setIsLoading, setErrorMessage, router }),
  };
}
