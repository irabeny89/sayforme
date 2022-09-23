import { FormEvent } from "react";
import { HookT } from "typings/mixTypes";
import createSendRequest from "./createSendRequest";

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
