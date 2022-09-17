import { useMutation } from "@apollo/client";
import { error5xx } from "config";
import { useEffect } from "react";
import {
  AUTHORIZE_USER,
  GET_MEMBER,
  MEMBERS,
} from "utils/api/graphql/client/documentNode";

export default function UserAuthorizeButton({
  userId,
}: Record<"userId", string>) {
  const [authorize, { loading, error, reset }] = useMutation<
    Record<"authorizeUser", string>,
    Record<"userId", string>
  >(AUTHORIZE_USER, {
    variables: { userId },
    refetchQueries: [GET_MEMBER, MEMBERS],
  });

  useEffect(() => {
    const timerId = setTimeout(reset, 5e4);
    return clearTimeout(timerId);
  }, [error, reset]);

  return (
    <div>
      <button
        className="btn btn-sm border-0 bg-primary"
        onClick={() => authorize()}
        disabled={loading}
      >
        Authorize
      </button>
      {error && (
        <small>
          <i>{error5xx}</i>
        </small>
      )}
    </div>
  );
}
