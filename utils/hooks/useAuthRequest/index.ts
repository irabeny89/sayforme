import {
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import createSubmitHandler from "./createSubmitHandler";
import clearErrorMessage from "./clearErrorMessage";
import { HookT } from "typings/mixTypes";

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
