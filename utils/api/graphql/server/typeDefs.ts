import { gql } from "apollo-server-micro";

const typeDefs = gql`
  # -- enumerations --
  enum RoleOptions {
    ADMIN
    OPERATOR
    CUSTOMER
  }
  enum CallStatusOptions {
    PENDING
    COMPLETE
    UNCOMPLETE
  }
  # -- objects --
  type Member {
    "Unique identity of the user."
    id: ID!
    "Authorized role."
    role: RoleOptions!
    "User email address."
    email: String!
    "Alias used on the app."
    username: String!
    "Date the user joined the platform."
    createdAt: String!
    "Last date the user updated his/her data."
    updatedAt: String!
  }
  type CallBooking {
    "Unique identity of the call booking."
    id: ID!
    "Call booking owner data object."
    owner: Member!
    "Call booking status."
    status: CallStatusOptions!
    "Message to be read to the recipient."
    message: String!
    "Number to call before reading message."
    recipientLine: String!
    "Date to call the recipient of the message."
    callOn: String!
    "The operator ID handling the call booking."
    handler: Member
    "Optional message to the call booker i.e owner."
    remark: String
    "Date call booking was made."
    createdAt: String!
    "Date call booking was edited."
    updatedAt: String!
  }
  # -- inputs --
  input CallBookingInputs {
    "Message to be sent to the recipient."
    message: String!
    "The number to call for message delivery."
    recipientLine: String!
    "Date to call the recipient."
    callOn: String!
  }
  # -- queries --
  type Query {
    "Test query"
    hello: String!
    "Return user profile"
    whoami: Member!
    "List of registered members."
    members: [Member]!
    "Get a booking."
    getCallBooking(bookingId: ID!): CallBooking
    "List of call bookings."
    callBookings: [CallBooking]!
  }
  type Mutation {
    "Only an ADMIN can permit a user/CUSTOMER to be an OPERATOR."
    authorizeOperator(userId: ID!): String!
    "Only ADMIN can demote an operator back to CUSTOMER."
    denyOperator(userId: ID!): String!
    "Create a call booking."
    addCallBooking(booking: CallBookingInputs!): String!
    "Only owner/CUSTOMER can update their call booking."
    editCallBooking(bookingId: ID!, booking: CallBookingInputs): String!
    "Only ADMIN & OPERATOR can accept to handle a call booking."
    handleCallBooking(bookingId: ID!): String!
    "Only ADMIN & OPERATOR can update booking to COMPLETE status and/or add remark."
    completeCall(bookingId: ID!, remark: String): String!
  }
`;

export default typeDefs;
