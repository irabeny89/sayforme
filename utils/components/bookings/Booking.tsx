import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { error5xx } from "config";
import { useEffect } from "react";
import {
  GET_CALL_BOOKING,
  HANDLE_CALL_BOOKING,
} from "utils/api/graphql/client/documentNode";
import { tokenPayloadVar } from "utils/api/graphql/client/reactiveVariables";
import BookingCompleteButton from "./BookingCompleteButton";
import BookingEditButton from "./BookingEditButton";
import BookingHandleButton from "./BookingHandleButton";

export default function Booking({ bookingId }: Record<"bookingId", string>) {
  const payload = useReactiveVar(tokenPayloadVar),
    { loading, error, data } = useQuery<
      BookingQueryT,
      Record<"bookingId", string>
    >(GET_CALL_BOOKING, { variables: { bookingId } });

  if (data) {
    const {
      callOn,
      id: bookingId,
      message,
      owner: { id: ownerId },
      handler: { id: handlerId },
      recipientLine,
      remark,
      status,
      createdAt,
      updatedAt,
    } = data.getCallBooking;

    return (
      <div>
        <h2>Booking Details</h2>
        <p>Full booking details list</p>
        <BookingHandleButton bookingId={bookingId} />
        <BookingCompleteButton bookingId={bookingId} />
        <BookingEditButton bookingId={bookingId} />
        <dl>
          <dt>Booking ID:</dt>
          <dd>{bookingId}</dd>
          <dt>Status:</dt>
          <dd>{status}</dd>
          <dt>Owner ID:</dt>
          <dd>{ownerId}</dd>
          <dt>Call On:</dt>
          <dd>{callOn}</dd>
          <dt>Recipient Line:</dt>
          <dd>{recipientLine}</dd>
          <dt>Message:</dt>
          <dd>{message}</dd>
          <dt>Created At:</dt>
          <dd>{createdAt}</dd>
          <dt>Updated At:</dt>
          <dd>{updatedAt}</dd>
          <dt>Handler ID</dt>
          <dd>{handlerId}</dd>
          <dt>Remark</dt>
          <dd>{remark}</dd>
        </dl>
      </div>
    );
  }
  return loading ? <i>Loading...</i> : error ? <i>{error5xx}</i> : null;
}
