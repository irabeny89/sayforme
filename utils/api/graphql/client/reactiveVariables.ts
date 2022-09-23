import { makeVar } from "@apollo/client";

export const tokenVar = makeVar("");

export const tokenPayloadVar = makeVar<SignAndGetTokenT | null | undefined>(
  null
);
