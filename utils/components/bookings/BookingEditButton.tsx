import { useMutation, useReactiveVar } from "@apollo/client";
import { error5xx } from "config";
import { FormEvent, useEffect, useState } from "react";
import {
  BOOKINGS_TABLE,
  EDIT_CALL_BOOKING,
  GET_CALL_BOOKING,
} from "utils/api/graphql/client/documentNode";
import { tokenPayloadVar } from "utils/api/graphql/client/reactiveVariables";
import BookingForm from "./BookingForm";

export default function BookingEditButton({
  bookingId,
  callOn,
  message,
  recipientLine,
}: BookingEditButtonPropsT) {
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
      const booking = Object.fromEntries(
        new FormData(e.currentTarget)
      ) as unknown as BookingEditButtonVariableT["booking"];
      await editBooking({
        variables: { bookingId, booking },
        refetchQueries: [GET_CALL_BOOKING, BOOKINGS_TABLE],
      });
      handleModalClose();
    };

  useEffect(() => {
    const timerId = setTimeout(reset, 5e4);
    return clearTimeout(timerId);
  }, [error, reset]);

  return (
    <div>
      <dialog open={openModal}>
        <h3>Edit Call Booking</h3>
        <p>Edit the call booking using the form below:</p>
        <BookingForm
          {...{ error, handleSubmit, loading, callOn, message, recipientLine }}
        />
        <button onClick={() => setOpenModal(false)}>X</button>
      </dialog>
      {error && <i>{error5xx}</i>}
      {!!isPermitted && (
        <button onClick={() => setOpenModal(true)}>Edit</button>
      )}
    </div>
  );
}
