import { error5xx } from "config";
import type { SendRequestT } from ".";
import handleResponse from "./handleResponse";

export default async function sendRequest({
  request,
  router,
  setErrorMessage,
  setIsLoading,
}: SendRequestT) {
  try {
    const res = await fetch("/api/rest", {
        method: "post",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(request),
      }),
      status = res.status + "",
      data = await res.text();
    handleResponse({ status, data, router, setErrorMessage, setIsLoading });
  } catch (error: any) {
    console.error(error);
    setIsLoading(false);
    setErrorMessage(error5xx);
  }
}