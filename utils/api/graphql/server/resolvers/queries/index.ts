import callBookings from "./callBookings";
import getCallBooking from "./getCallBooking";
import getMember from "./getMember";
import members from "./members";
import whoami from "./whoami";

const Query = {
  hello: () => "world",
  whoami,
  members,
  getMember,
  getCallBooking,
  callBookings
};
export default Query;
