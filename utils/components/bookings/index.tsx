import { useState } from "react";
import BookingsTable from "utils/components/bookings/BookingsTable";
import AddBookingForm from "./AddBookingForm";

export default function Bookings() {
  const [openModal, setOpenModal] = useState(false),
    handleOpenModal = () => setOpenModal(true),
    handleCloseModal = () => setOpenModal(false);

  return (
    <div className="min-h-screen mt-10 space-y-10">
      <h2 className="text-xl underline">Bookings</h2>
      <div className="sm:w-1/2 md:w-fit mx-auto">
        <p>List of all Call Bookings</p>
        <dialog open={openModal} className="z-20">
          <button
            onClick={handleCloseModal}
            className="float-right text-secondary"
          >
            X
          </button>
          <h3>Booking</h3>
          <p>Fill the form below to create a booking:</p>
          <AddBookingForm handleCloseModal={handleCloseModal} />
        </dialog>
        <button
          onClick={handleOpenModal}
          className="btn btn-sm border-0 bg-primary my-5"
        >
          Add Booking
        </button>
        <BookingsTable />
      </div>
    </div>
  );
}
