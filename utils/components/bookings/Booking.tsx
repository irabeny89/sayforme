import { useQuery } from "@apollo/client";
import { error5xx } from "config";
import { GET_CALL_BOOKING } from "utils/api/graphql/client/documentNode";
import createDateString from "utils/createDateString";
import BookingCompleteButton from "./BookingCompleteButton";
import BookingEditButton from "./BookingEditButton";
import BookingHandleButton from "./BookingHandleButton";

export default function Booking({ bookingId }: Record<"bookingId", string>) {
  const { loading, error, data } = useQuery<
    BookingQueryT,
    Record<"bookingId", string>
  >(GET_CALL_BOOKING, { variables: { bookingId } });

  if (data) {
    const {
      callOn,
      id: bookingId,
      message,
      owner: { id: ownerId },
      handler,
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
        <BookingHandleButton bookingId={bookingId} handlerId={handler?.id} />
        <BookingCompleteButton {...{ bookingId, status, callOn }} />
        <BookingEditButton {...{ bookingId, callOn, message, recipientLine }} />
        <dl>
          <dt>Booking ID:</dt>
          <dd>{bookingId}</dd>
          <dt>Status:</dt>
          <dd>{status}</dd>
          <dt>Owner ID:</dt>
          <dd>{ownerId}</dd>
          <dt>Call On:</dt>
          <dd>{createDateString(callOn)}</dd>
          <dt>Recipient Line:</dt>
          <dd>{recipientLine}</dd>
          <dt>Message:</dt>
          <dd>{message}</dd>
          <dt>Created At:</dt>
          <dd>{createDateString(createdAt)}</dd>
          <dt>Updated At:</dt>
          <dd>{createDateString(updatedAt)}</dd>
          <dt>Handler ID:</dt>
          <dd>{handler?.id}</dd>
          <dt>Remark:</dt>
          <dd>{remark}</dd>
        </dl>
      </div>
    );
  }
  return loading ? <i>Loading...</i> : error ? <i>{error5xx}</i> : null;
}
