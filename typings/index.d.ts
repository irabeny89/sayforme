type RoleT = "ADMIN" | "OPERATOR" | "CUSTOMER";

type BookingStatusT = "PENDING" | "COMPLETE" | "UNCOMPLETE";

type SignAndGetTokenT = {
  email: string;
  username: string;
  role: RoleT;
  iat?: number;
  exp?: number;
};

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
  ownerId: string;
  handlerId: string;
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

type BookingTableRowPropsT = Record<"index", number> &
  Pick<CallBookingT, "recipientLine" | "status"> &
  Record<"callOn" | "id", string>;

type BookingsQueryT = Record<"callBookings", BookingTablePropsT[]>;

type BookingQueryT = Record<"getCallBooking", BookingTablePropsT>;

type BookingFormQueryVariablesT = Record<
  "booking",
  Record<"recipientLine" | "message" | "callOn", string>
>;

type BookingFormPropsT = {
  handleCloseModal: () => void;
};

type BookingCompleteButtonVariableT = { bookingId: string; remark?: string };

type BookingEditButtonVariableT = BookingFormQueryVariablesT &
  Record<"bookingId", string>;
