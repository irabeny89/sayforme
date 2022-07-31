import { useState } from "react";
import BookingsTable from "utils/components/bookings/BookingsTable";
import AddBookingForm from "./AddBookingForm";

export default function Bookings() {
  const [openModal, setOpenModal] = useState(false),
    handleOpenModal = () => setOpenModal(true),
    handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      <h2>Bookings</h2>
      <p>List of all Call Bookings</p>
      <dialog open={openModal}>
        <h3>Booking</h3>
        <p>Fill the form below to create a booking:</p>
        <AddBookingForm handleCloseModal={handleCloseModal} />
        <button onClick={handleCloseModal}>X</button>
      </dialog>
      <button onClick={handleOpenModal}>Add Booking</button>
      <BookingsTable />
    </div>
  );
}
