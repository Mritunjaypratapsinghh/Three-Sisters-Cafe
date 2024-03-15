import React, { useState } from 'react';

const ManageBooking = () => {
  const [bookingData, setBookingData] = useState([
    // Your dummy booking data here
  ]);

  const [sortBy, setSortBy] = useState(null);

  // Function to sort bookings based on a specified key
  const sortBookings = (key) => {
    const sortedBookings = [...bookingData].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });

    setBookingData(sortedBookings);
  };

  // Function to filter bookings based on user name
  const filterBookings = (userName) => {
    const filteredBookings = bookingData.filter(
      (booking) => booking.userName.toLowerCase() === userName.toLowerCase()
    );

    setBookingData(filteredBookings);
  };

  // Function to reset bookings to the original state
  const resetBookings = () => {
    // Reset booking data to the original state
    // For example, fetch data from the server again
    // or set it to a predefined dummy data array
  };

  return (
    <div className="w-full md:w-[900px] px-4 mx-auto">
      <div className="bg-stone-950 rounded-2xl mt-4 px-4 py-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center">Manage Bookings</h1>

        {/* Filter and Sort Controls */}
        <div className="flex justify-between items-center mt-4">
          {/* Sort Dropdown */}
          <div>
            <label htmlFor="sortBy" className="mr-2">
              Sort by:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                sortBookings(e.target.value);
              }}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value="">None</option>
              <option value="id">ID</option>
              <option value="userName">User Name</option>
              <option value="bookingDate">Booking Date</option>
              <option value="time">Time</option>
              <option value="tableNo">Table No</option>
            </select>
          </div>

          {/* Filter Input */}
          <div>
            <label htmlFor="filterInput" className="mr-2">
              Filter by user name:
            </label>
            <input
              id="filterInput"
              type="text"
              placeholder="Enter user name"
              onChange={(e) => filterBookings(e.target.value)}
              className="border border-gray-300 rounded-md p-1"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={resetBookings}
            className="bg-yellow-300 hover:bg-yellow-400 text-slate-700 font-medium py-1 px-4 rounded-md"
          >
            Reset
          </button>
        </div>

        {/* Booking Table */}
        <div className="overflow-x-auto mt-6">
          <table className="border border-gray-300 w-full rounded-md">
            <thead className="bg-yellow-300 text-slate-700">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">Booking Date</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Table No</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((booking) => (
                <tr key={booking.id} className="bg-stone-950">
                  <td className="py-3 px-6">{booking.id}</td>
                  <td className="py-3 px-6">{booking.userName}</td>
                  <td className="py-3 px-6">{booking.bookingDate}</td>
                  <td className="py-3 px-6">{booking.time}</td>
                  <td className="py-3 px-6">{booking.tableNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
