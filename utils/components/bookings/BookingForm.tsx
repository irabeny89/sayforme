import { useMutation } from "@apollo/client";
import { error5xx } from "config";
import { FormEvent, useEffect } from "react";
import { ADD_CALL_BOOKING } from "utils/api/graphql/client/documentNode";

export default function BookingForm({ handleCloseModal }: BookingFormPropsT) {
  const [addCallBooking, { loading, error, data, reset }] = useMutation<
      Record<"addCallBooking", string>,
      BookingFormQueryVariablesT
    >(ADD_CALL_BOOKING),
    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const booking = Object.fromEntries(
        new FormData(e.currentTarget)
      ) as BookingFormQueryVariablesT["booking"];

      await addCallBooking({ variables: { booking } });
      handleCloseModal();
    };

  useEffect(() => {
    const timerId = setTimeout(reset, 5e4);
    return clearTimeout(timerId);
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="recipientLine"
          placeholder="Recipient line eg 080XX"
          type="tel"
          required
        />
      </div>
      <div>
        <textarea rows={4} name="message" placeholder="Message" required />
      </div>
      <div>
        <label>
          Date and Time
          <input name="callOn" type="datetime-local" required />
        </label>
      </div>
      <div>
        <button disabled={loading}>
          {loading ? <i>wait...</i> : "Sumbmit"}
        </button>
      </div>
      <i>{error && error5xx}</i>
    </form>
  );
}
