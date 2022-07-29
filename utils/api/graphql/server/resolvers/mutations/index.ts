import addCallBooking from "./addCallBooking"
import authorizeUser from "./authorizeUser"
import completeCall from "./completeCall"
import denyUser from "./denyUser"
import editCallBooking from "./editCallBooking"
import handleCallBooking from "./handleCallBooking"

const Mutation = {
  authorizeUser,
  denyUser,
  addCallBooking,
  editCallBooking,
  handleCallBooking,
  completeCall
}

export default Mutation