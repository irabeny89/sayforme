import { useMutation, useReactiveVar } from "@apollo/client";
import { error5xx } from "config";
import { FormEvent, useEffect, useState } from "react";
import {
  COMPLETE_CALL,
  GET_CALL_BOOKING,
} from "utils/api/graphql/client/documentNode";
import { tokenPayloadVar } from "utils/api/graphql/client/reactiveVariables";

export default function BookingCompleteButton({
  bookingId,
}: Record<"bookingId", string>) {
  const payload = useReactiveVar(tokenPayloadVar),
  [openModal, setOpenModal] = useState(false),
    // when double-inverted it returns false for customer role
    isPermitted = payload?.role !== "CUSTOMER",
    [completeCall, { loading, error, reset }] = useMutation<
      Record<"completeCall", string>,
      BookingCompleteButtonVariableT
    >(COMPLETE_CALL),
    handleModalClose = () => setOpenModal(false),
    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { remark } = Object.fromEntries(
        new FormData(e.currentTarget)
      ) as Record<"remark", string>;
      await completeCall({
        variables: { bookingId, remark },
        refetchQueries: [GET_CALL_BOOKING],
      });
      handleModalClose()
    };

  useEffect(() => {
    const timerId = setTimeout(reset, 5e4);
    return clearTimeout(timerId);
  }, [error]);

  return (
    <div>
      <dialog open={openModal}>
        <h3>Complete Call</h3>
        <p>
          Call completed. Optional, add a remark/note for the call booking
          owner.
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            name="remark"
            placeholder="Any remark or note for the owner"
          />
          <button type="submit" disabled={loading}>Completed Call</button>
        </form>
      </dialog>
      {error && <i>{error5xx}</i>}
      {!!isPermitted && (
        <button onClick={() => setOpenModal(true)}>
          Complete
        </button>
      )}
    </div>
  );
}
