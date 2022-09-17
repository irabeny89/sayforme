import { useQuery } from "@apollo/client";
import { error5xx } from "config";
import { useRouter } from "next/router";
import { GET_CALL_BOOKING } from "utils/api/graphql/client/documentNode";
import createDateString from "utils/createDateString";
import BookingCompleteButton from "./BookingCompleteButton";
import BookingEditButton from "./BookingEditButton";
import BookingHandleButton from "./BookingHandleButton";

export default function Booking({ bookingId }: Record<"bookingId", string>) {
  const { back } = useRouter();
  const goBack = () => back();
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
      <div className="min-h-screen mt-10 space-y-10">
        <div className="flex justify-between">
          <h2 className="text-xl underline">Booking Details</h2>
          <button
            onClick={goBack}
            className="btn btn-xs bg-base-300 border-0 shadow-md text-gray-400 hover:text-base-200"
          >
            &larr; Bookings List
          </button>
        </div>
        <div className="space-y-5 sm:w-1/2 mx-auto">
          <p>Full booking details list</p>

          <dl className="space-y-3">
            <div>
              <dt className="text-xs">Booking ID:</dt>
              <dd>{bookingId}</dd>
              <hr />
            </div>
            <div>
              <dt className="text-xs">Status:</dt>
              <dd>{status}</dd>
              <hr />
            </div>
            <div>
              <dt className="text-xs">Owner ID:</dt>
              <dd>{ownerId}</dd>
            </div>
            <hr />
            <div>
              <dt className="text-xs">Call On:</dt>
              <dd>{createDateString(callOn)}</dd>
            </div>
            <hr />
            <div>
              <dt className="text-xs">Recipient Line:</dt>
              <dd>{recipientLine}</dd>
            </div>
            <hr />
            <div>
              <dt className="text-xs">Message:</dt>
              <dd>{message}</dd>
            </div>
            <hr />
            <div>
              <dt className="text-xs">Created At:</dt>
              <dd>{createDateString(createdAt)}</dd>
            </div>
            <hr />
            <div>
              <dt className="text-xs">Updated At:</dt>
              <dd>{createDateString(updatedAt)}</dd>
            </div>
            <hr />
            <div>
              <dt className="text-xs">Handler ID:</dt>
              <dd>{handler?.id}</dd>
            </div>
            <hr />
            <div>
              <dt className="text-xs">Remark:</dt>
              <dd>{remark}</dd>
            </div>
            <hr />
          </dl>

          <BookingHandleButton bookingId={bookingId} handlerId={handler?.id} />
          <BookingCompleteButton {...{ bookingId, status, callOn }} />
          <BookingEditButton
            {...{ bookingId, callOn, message, recipientLine }}
          />
        </div>
      </div>
    );
  }
  return loading ? <i>Loading...</i> : error ? <i>{error5xx}</i> : null;
}
