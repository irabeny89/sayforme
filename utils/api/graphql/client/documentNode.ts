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

export const CALL_BOOKING_LIST = gql`
  ${MEMBER_FRAGMENT}
  query CallBookingList {
    callBookings {
      id
      owner {
        ...MemberFields
      }
      status
      message
      recipientLine
      callOn
      remark
    }
  }
`;
