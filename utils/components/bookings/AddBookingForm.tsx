import { useMutation } from "@apollo/client";
import { FormEvent, useEffect } from "react";
import {
  ADD_CALL_BOOKING,
  BOOKINGS_TABLE,
} from "utils/api/graphql/client/documentNode";
import BookingForm from "./BookingForm";

export default function AddBookingForm({
  handleCloseModal,
}: AddBookingFormPropsT) {
  const [addCallBooking, { loading, error, reset }] = useMutation<
      Record<"addCallBooking", string>,
      BookingFormQueryVariablesT
    >(ADD_CALL_BOOKING),
    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const booking = Object.fromEntries(
        new FormData(e.currentTarget)
      ) as BookingFormQueryVariablesT["booking"];

      await addCallBooking({
        variables: { booking },
        refetchQueries: [BOOKINGS_TABLE],
      });
      handleCloseModal();
    };

  useEffect(() => {
    const timerId = setTimeout(reset, 5e4);
    return clearTimeout(timerId);
  }, [error, reset]);

  return <BookingForm {...{ error, loading, handleSubmit }} />;
}
