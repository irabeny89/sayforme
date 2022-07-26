import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { NextRouter, useRouter } from "next/router";
import createSubmitHandler from "./createSubmitHandler";
import clearErrorMessage from "./clearErrorMessage";

export type HookT = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  router: NextRouter;
};

export type HandleResponseT = HookT & Record<"status" | "data", string>;

export type SendRequestT = HookT & Record<"request", AuthRequestT>;

export default function useAuthRequest() {
  const [errorMessage, setErrorMessage] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    router = useRouter(),
    handleSubmit = createSubmitHandler({
      router,
      setErrorMessage,
      setIsLoading,
    });

  useEffect(() => {
    const timerId = setTimeout(clearErrorMessage(setErrorMessage), 6e4);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  return {
    isLoading,
    errorMessage,
    handleSubmit,
  };
}
