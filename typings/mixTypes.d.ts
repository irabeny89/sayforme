import { FormEvent } from "react";
import { NextApiResponse } from "next";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { Model, Document } from "mongoose";

type BookingFormPropsT = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
  error: any;
} & Partial<CallBookingInputT>;

type CallHandlerArgsT = Record<"role" | "bookingId" | "userId", string> &
  Pick<GqlContext, "CallBooking"> &
  Partial<Record<"remark", string>>;

type MemberModelT = Model<MemberDocumentT>;

type MemberDocumentT = Document & MemberT

type CallBookingModelT = Model<CallBookingDocumentT>;
  
type CallBookingDocumentT = Document & CallBookingT;

type GqlContext = {
  Member: MemberModelT;
  CallBooking: CallBookingModelT
  token: string;
  payload: SignAndGetTokenT;
  res: NextApiResponse;
};

type GqlContextArgs = {
  req: MicroRequest;
  res: NextApiResponse;
};

type BookingHandlerArgsT = {
  CallBooking: CallBookingModelT;
  role: RoleT;
  userId: string;
};

type EditBookingHandlerArgsT = {
  CallBooking: CallBookingModelT;
  booking: CallBookingInputT;
  bookingId: string;
  userId: string;
};
