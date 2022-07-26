import type { HookT } from ".";
import sendRequest from "./sendRequest";

export default function createSendRequest(hooks: HookT) {
  return async function (request: AuthRequestT) {
    await sendRequest({ request, ...hooks });
  };
}
