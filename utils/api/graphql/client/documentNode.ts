import { gql } from "@apollo/client";

const MEMBER_FRAGMENT = gql`
  fragment MemberFields on Member {
    id
    role
    email
    username
    createdAt
    updatedAt
  }
`;

const CALL_BOOKING_FRAGMENT = gql`
  fragment CallBookingFields on CallBooking {
    id
    owner {
      id
    }
    handler {
      id
    }
    status
    message
    recipientLine
    callOn
    remark
    createdAt
    updatedAt
  }
`;

export const WHO_AM_I = gql`
  ${MEMBER_FRAGMENT}
  query WhoAmI {
    whoami {
      ...MemberFields
    }
  }
`

export const MEMBERS = gql`
  query Members {
    members {
      id
      email
      username
      role
    }
  }
`;

export const GET_MEMBER = gql`
  ${MEMBER_FRAGMENT}
  query GetMember($userId: ID!) {
    getMember(userId: $userId) {
      ...MemberFields
    }
  }
`;

export const GET_CALL_BOOKING = gql`
  ${CALL_BOOKING_FRAGMENT}
  query GetCallBooking($bookingId: ID!) {
    getCallBooking(bookingId: $bookingId) {
      ...CallBookingFields
    }
  }
`;

export const BOOKINGS_TABLE = gql`
  query CallBookings {
    callBookings {
      id
      status
      callOn
      recipientLine
    }
  }
`;

export const HANDLE_CALL_BOOKING = gql`
  mutation HandleCallBooking($bookingId: ID!) {
    handleCallBooking(bookingId: $bookingId)
  }
`;

export const ADD_CALL_BOOKING = gql`
  mutation AddCallBooking($booking: CallBookingInputs!) {
    addCallBooking(booking: $booking)
  }
`;

export const EDIT_CALL_BOOKING = gql`
  mutation EditCallBooking($bookingId: ID!, $booking: CallBookingInputs!) {
    editCallBooking(bookingId: $bookingId, booking: $booking)
  }
`;

export const COMPLETE_CALL = gql`
  mutation CompleteCall($bookingId: ID!, $remark: String) {
    completeCall(bookingId: $bookingId, remark: $remark)
  }
`;

export const AUTHORIZE_USER = gql`
  mutation AuthorizeOperator($userId: ID!) {
    authorizeUser(userId: $userId)
  }
`;

export const DENY_USER = gql`
  mutation DenyUser($userId: ID!) {
    denyUser(userId: $userId)
  }
`;
