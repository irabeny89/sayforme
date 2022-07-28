import { useMutation } from "@apollo/client";
import { error5xx } from "config";
import { useEffect } from "react";
import {
  AUTHORIZE_USER,
  DENY_USER,
  GET_MEMBER,
  MEMBERS,
} from "utils/api/graphql/client/documentNode";

export default function UserDenyButton({ userId }: Record<"userId", string>) {
  const [deny, { loading, error, reset }] = useMutation<
    Record<"denyUser", string>,
    Record<"userId", string>
  >(DENY_USER, {
    variables: { userId },
    refetchQueries: [GET_MEMBER, MEMBERS],
  });

  useEffect(() => {
    const timerId = setTimeout(reset, 5e4);
    return clearTimeout(timerId);
  }, [error]);

  return (
    <div>
      <button onClick={() => deny()} disabled={loading}>
        Deny
      </button>
      {error && (
        <small>
          <i>{error5xx}</i>
        </small>
      )}
    </div>
  );
}
