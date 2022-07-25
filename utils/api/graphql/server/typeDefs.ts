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
    recipientLine: Int!
    "Date to call the recipient of the message."
    callOn: String!
    "Optional message to the call booker i.e owner."
    remark: String
  }
  # -- inputs --
  input CallBookingInputs {
    "Message to be sent to the recipient."
    message: String!
    "The number to call for message delivery."
    recipientLine: Int!
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
    "List of call bookings."
    callBookings: [CallBooking]!
  }
  type Mutation {
    "Permit a user to be an operator."
    authorizeOperator(userId: ID!): String!
    "Demote an operator."
    denyOperator(userId: ID!): String!
    "Create a call booking."
    addCallBooking(booking: CallBookingInputs!): String!
    "Update an existing call booking."
    editCallBooking(bookingId: ID!, booking: CallBookingInputs): String!
    "Update booking to complete status and/or add remark."
    completeCall(bookingId: ID!, remark: String): String!
  }
`;

export default typeDefs;
