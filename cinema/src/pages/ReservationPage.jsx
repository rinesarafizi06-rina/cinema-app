import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const moviePrices = {
  "John Wick": 8,
  "Avengers": 10,
  "Batman": 9,
  "Interstellar": 7,
  default: 6,
};

const times = ["10:00", "11:30", "14:00", "17:00", "20:00", "22:30"];

const ReservationPage = () => {
  const [name, setName] = useState("");
  const [movie, setMovie] = useState("");
  const [tickets, setTickets] = useState(0);

  const [date, setDate] = useState(null);

  const [time, setTime] = useState("");
  const [openTime, setOpenTime] = useState(false);

  const [message, setMessage] = useState("");

  const [reservations, setReservations] = useState([]);
  const [editId, setEditId] = useState(null);

  const getPrice = (movieName) =>
    moviePrices[movieName] || moviePrices.default;

  const isValidName = (val) => {
    const clean = val.trim();
    const regex = /^[A-Za-z\s]+$/;
    return clean.length >= 3 && regex.test(clean);
  };

  const handleReserve = (e) => {
    e.preventDefault();

    if (!isValidName(name)) {
      setMessage("Name must be at least 3 letters.");
      return;
    }

    if (!movie || !date || !time || tickets === 0) {
      setMessage("Please fill all fields.");
      return;
    }

    const newReservation = {
      id: editId || Date.now(),
      name,
      movie,
      tickets,
      date: date.toLocaleDateString(),
      time,
      price: getPrice(movie) * tickets,
    };

    let updated;

    if (editId) {
      updated = reservations.map((r) =>
        r.id === editId ? newReservation : r
      );
      setEditId(null);
    } else {
      updated = [...reservations, newReservation];
    }

    setReservations(updated);

    setMessage("Reservation saved!");

    setName("");
    setMovie("");
    setTickets(0);
    setDate(null);
    setTime("");
  };

  const placeholderColor = "text-gray-400";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 sm:px-6 py-6">

      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-6 text-center">
        Movie Reservation
      </h1>

      {/* FORM CONTAINER */}
      <div className="w-full sm:max-w-md md:max-w-lg bg-[#111] border border-red-600 p-4 sm:p-6 rounded-xl">

        <form onSubmit={handleReserve} className="space-y-3">

          {/* NAME */}
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 sm:p-3 bg-black border border-gray-700 rounded ${placeholderColor}`}
          />

          {/* MOVIE */}
          <input
            placeholder="Movie name"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            className={`w-full p-2 sm:p-3 bg-black border border-gray-700 rounded ${placeholderColor}`}
          />

          {/* DATE */}
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Select Date"
            minDate={new Date()}
            wrapperClassName="w-full"
            className={`w-full p-2 sm:p-3 bg-black border border-gray-700 rounded ${placeholderColor}`}
          />

          {/* TIME */}
          <div className="relative w-full">

            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenTime(!openTime);
              }}
              className={`w-full p-2 sm:p-3 bg-[#0a0a0a] border border-gray-700 rounded cursor-pointer ${
                time ? "text-white" : placeholderColor
              }`}
            >
              {time || "Select Time"}
            </div>

            {openTime && (
              <div className="absolute z-10 w-full mt-1 bg-[#111] border border-gray-700 rounded overflow-hidden">

                {times.map((t) => (
                  <div
                    key={t}
                    onClick={() => {
                      setTime(t);
                      setOpenTime(false);
                    }}
                    className="p-2 hover:bg-red-600 cursor-pointer transition"
                  >
                    {t}
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* TICKETS */}
          <div className="flex items-center bg-black border border-gray-700 rounded overflow-hidden">

            <button
              type="button"
              onClick={() => setTickets(tickets > 0 ? tickets - 1 : 0)}
              className="px-3 py-2 text-gray-400 hover:bg-red-600 hover:text-white"
            >
              -
            </button>

            <input
              type="text"
              value={tickets === 0 ? "Tickets" : tickets}
              readOnly
              className={`w-full text-center bg-black outline-none ${
                tickets === 0 ? placeholderColor : "text-white"
              }`}
            />

            <button
              type="button"
              onClick={() => setTickets(tickets + 1)}
              className="px-3 py-2 text-gray-400 hover:bg-red-600 hover:text-white"
            >
              +
            </button>

          </div>

          {/* BUTTON */}
          <button className="w-full bg-red-600 py-2 sm:py-3 rounded hover:bg-red-700 transition">
            {editId ? "Update Reservation" : "Reserve"}
          </button>

        </form>

        {message && (
          <p className="text-sm text-green-400 mt-3">{message}</p>
        )}

      </div>

      {/* LIST */}
      <div className="w-full sm:max-w-md md:max-w-lg mt-6 space-y-3">

        {reservations.map((r) => (
          <div
            key={r.id}
            className="bg-[#111] border border-gray-800 p-3 rounded flex justify-between"
          >
            <div>
              <p className="font-bold">{r.movie}</p>
              <p>{r.date} • {r.time}</p>
              <p>{r.tickets} tickets</p>
              <p className="text-green-400">{r.price}€</p>
            </div>

            <button
              onClick={() => setEditId(r.id)}
              className="text-red-500 text-sm"
            >
              Edit
            </button>
          </div>
        ))}

      </div>

    </div>
  );
};

export default ReservationPage;