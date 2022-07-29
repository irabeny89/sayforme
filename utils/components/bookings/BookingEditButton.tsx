import { useMutation, useReactiveVar } from "@apollo/client";
import { error5xx } from "config";
import { FormEvent, useEffect, useState } from "react";
import {
  EDIT_CALL_BOOKING,
  GET_CALL_BOOKING,
} from "utils/api/graphql/client/documentNode";
import { tokenPayloadVar } from "utils/api/graphql/client/reactiveVariables";

export default function BookingEditButton({
  bookingId,
}: Record<"bookingId", string>) {
  const payload = useReactiveVar(tokenPayloadVar),
    [openModal, setOpenModal] = useState(false),
    // when double-inverted it returns false for customer role
    isPermitted = payload?.role === "CUSTOMER",
    [editBooking, { loading, error, reset }] = useMutation<
      Record<"editCallBooking", string>,
      BookingEditButtonVariableT
    >(EDIT_CALL_BOOKING),
    handleModalClose = () => setOpenModal(false),
    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { bookingId, ...booking } = Object.fromEntries(
        new FormData(e.currentTarget)
      ) as unknown as BookingEditButtonVariableT["booking"] &
        Record<"bookingId", string>;
      await editBooking({
        variables: { bookingId, booking },
        refetchQueries: [GET_CALL_BOOKING],
      });
      handleModalClose();
    };

  useEffect(() => {
    const timerId = setTimeout(reset, 5e4);
    return clearTimeout(timerId);
  }, [error]);

  return (
    <div>
      <dialog open={openModal}>
        <h3>Edit Call Booking</h3>
        <p>Edit the call booking using the form below:</p>
        <form onSubmit={handleSubmit}>
          <input name="recipientLine" placeholder="Recipient line" required />
          <input name="callOn" type="datetime-local" required />
          <textarea
            name="message"
            placeholder="Any remark or note for the owner"
          />
          <button type="submit" disabled={loading}>
            Completed Call
          </button>
        </form>
        <button onClick={() => setOpenModal(false)}>X</button>
      </dialog>
      {error && <i>{error5xx}</i>}
      {!!isPermitted && (
        <button onClick={() => setOpenModal(true)}>Edit</button>
      )}
    </div>
  );
}
