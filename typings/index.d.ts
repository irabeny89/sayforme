type RoleT = "ADMIN" | "OPERATOR" | "CUSTOMER";

type BookingStatusT = "PENDING" | "COMPLETE" | "UNCOMPLETE";

type SignAndGetTokenT = {
  email: string;
  username: string;
  role: RoleT
}

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
  status: BookingStatusT;
  message: string;
  recipientLine: number;
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
