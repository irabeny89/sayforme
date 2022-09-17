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
  status,
  callOn,
}: BookingCompleteButtonPropsT) {
  const payload = useReactiveVar(tokenPayloadVar),
    [openModal, setOpenModal] = useState(false),
    // when double-inverted it returns false for customer role
    isPermitted =
      payload?.role !== "CUSTOMER" &&
      status === "PENDING" &&
      Date.now() >= +callOn,
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
      handleModalClose();
    };

  useEffect(() => {
    const timerId = setTimeout(reset, 5e4);
    return clearTimeout(timerId);
  }, [error, reset]);

  return (
    <div>
      <dialog open={openModal} className="w-full max-w-xs">
        <button
          onClick={() => setOpenModal(false)}
          className="text-secondary float-right"
        >
          X
        </button>
        <h3>Complete Call</h3><hr />
        <p className="mt-5">
          Optional, add a remark/note for the call booking owner either because
          of success or failed calls.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <textarea
            name="remark"
            placeholder="Any remark or note for the owner"
            className="w-full max-w-xs textarea textarea-bordered mt-5"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-sm bg-success border-0 shadow-md"
          >
            Completed Call
          </button>
        </form>
        <br />
      </dialog>
      {error && <i>{error5xx}</i>}
      {!!isPermitted && (
        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-sm bg-success border-0 shadow-md"
        >
          Complete
        </button>
      )}
    </div>
  );
}
