import { Dispatch, SetStateAction } from "react";

export default function clearErrorMessage(
  setErrorMessage: Dispatch<SetStateAction<string>>
) {
  return () => setErrorMessage("");
}
