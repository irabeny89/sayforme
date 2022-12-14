import { useMutation, useReactiveVar } from "@apollo/client";
import { error5xx } from "config";
import { useEffect } from "react";
import {
  GET_CALL_BOOKING,
  HANDLE_CALL_BOOKING,
} from "utils/api/graphql/client/documentNode";
import { tokenPayloadVar } from "utils/api/graphql/client/reactiveVariables";

export default function BookingHandleButton({
  bookingId,
  handlerId,
}: BookingHandleButtonPropsT) {
  const payload = useReactiveVar(tokenPayloadVar),
    // when double-inverted it returns false for customer role
    isPermitted = payload?.role !== "CUSTOMER" && !handlerId,
    [handleCallBooking, { loading, error, reset }] = useMutation<
      Record<"addCallBooking", string>,
      Record<"bookingId", string>
    >(HANDLE_CALL_BOOKING, {
      variables: { bookingId },
      refetchQueries: [GET_CALL_BOOKING],
    });

  useEffect(() => {
    const timerId = setTimeout(reset, 5e4);
    return clearTimeout(timerId);
  }, [error, reset]);

  return (
    <div>
      {error && <i>{error5xx}</i>}
      {!!isPermitted && (
        <button
          onClick={() => handleCallBooking()}
          disabled={loading}
          className="btn btn-sm bg-primary"
        >
          {loading ? <i>wait...</i> : "Handle"}
        </button>
      )}
    </div>
  );
}
