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
    "The operator handling the call booking."
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
    "Return user profile. All user can access."
    whoami: Member
    "Only ADMIN can get list of registered members."
    members: [Member]!
    "Only ADMIN can get a user data."
    getMember(userId: ID!): Member
    "Get a booking. All users has access."
    getCallBooking(bookingId: ID!): CallBooking
    "List of call bookings. All users has access."
    callBookings: [CallBooking]!
  }
  type Mutation {
    "Only an ADMIN can permit a user/CUSTOMER to be an OPERATOR."
    authorizeUser(userId: ID!): String!
    "Only ADMIN can demote an operator back to CUSTOMER."
    denyUser(userId: ID!): String!
    "Create a call booking. All users can create."
    addCallBooking(booking: CallBookingInputs!): String!
    "Only owner can update their call booking."
    editCallBooking(bookingId: ID!, booking: CallBookingInputs): String!
    "Only ADMIN & OPERATOR can handle a call booking."
    handleCallBooking(bookingId: ID!): String!
    "Only ADMIN & OPERATOR can update booking to COMPLETE status and/or add remark."
    completeCall(bookingId: ID!, remark: String): String!
  }
`;

export default typeDefs;
