type RoleT = "ADMIN" | "OPERATOR" | "CUSTOMER";

type BookingStatusT = "PENDING" | "COMPLETE" | "UNCOMPLETE";

type PayloadT = {
  email: string;
  username: string;
  role: RoleT;
  userId: string;
};

type SignAndGetTokenT = {
  iat?: number;
  exp?: number;
} & PayloadT;

type IdAndTimeStampsT = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type MemberT = {
  role: RoleT;
  email: string;
  hashedPassword: string;
  username: string;
  salt: string;
} & IdAndTimeStampsT;

type MemberDocumentT = mongoose.Document & MemberT;

type CallBookingT = {
  owner: string;
  handler: string;
  status: BookingStatusT;
  message: string;
  recipientLine: string;
  callOn: Date;
  remark?: string;
} & IdAndTimeStampsT;

type ResponseT = {
  status: "error" | "ok";
  code: number;
  data: any;
};

type FormDataT = Record<"username" | "email" | "password", string>;

type AuthRequestT = Record<"action", "register" | "login"> & FormDataT;

type CallBookingInputT = Record<"recipientLine" | "message" | "callOn", string>;

type BookingTableRowPropsT = CallBookingInputT & {
  index: number;
  status: BookingStatusT;
  id: string;
};

type BookingsQueryT = Record<"callBookings", BookingTablePropsT[]>;

type BookingQueryT = Record<"getCallBooking", BookingTablePropsT>;

type BookingFormQueryVariablesT = Record<"booking", CallBookingInputT>;

type BookingFormPropsT = {
  handleCloseModal: () => void;
};

type BookingCompleteButtonVariableT = { bookingId: string; remark?: string };

type BookingEditButtonVariableT = BookingFormQueryVariablesT &
  Record<"bookingId", string>;

type UserT = Pick<MemberT, "email" | "role" | "username"> &
  Record<"id" | "createdAt" | "updatedAt", string>;

type UsersQueryT = Record<"members", UserT[]>;

type UsersTableRowT = UserT & Record<"index", number>;

type UserQueryT = Record<
  "getMember",
  Pick<MemberT, "email" | "role" | "username"> &
    Record<keyof IdAndTimeStampsT, string>
>;

type CompleteCallT = { bookingId: string; remark?: string };

type BookingCompleteButtonPropsT = {
  bookingId: string;
  status: BookingStatusT;
  callOn: string;
};

type BookingHandleButtonT = {
  bookingId: string;
  handlerId: string | undefined;
};
