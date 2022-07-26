import { NextRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction } from "react";
import createSendRequest from "./createSendRequest";
import type { HookT } from ".";

export default function createSubmitHandler({
  setIsLoading,
  setErrorMessage,
  router,
}: HookT) {
  const sendRequest = createSendRequest({
    router,
    setErrorMessage,
    setIsLoading,
  });

  return (action: "login" | "register") =>
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const inputs = Object.fromEntries(
        new FormData(e.currentTarget)
      ) as FormDataT;
      await sendRequest({ action, ...inputs });
    };
}
