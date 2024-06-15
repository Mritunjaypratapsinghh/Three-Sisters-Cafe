import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBooking = () => {
  const [bookingData, setBookingData] = useState([]);
  const [initialBookingData, setInitialBookingData] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:6001/bookings'); // Replace with your API endpoint
        setBookingData(response.data);
        setInitialBookingData(response.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchData();
  }, []);

  const sortBookings = (key) => {
    const sortedBookings = [...bookingData].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });

    setBookingData(sortedBookings);
  };

  const filterBookings = (userName) => {
    const filteredBookings = initialBookingData.filter(
      (booking) => booking.userName.toLowerCase().includes(userName.toLowerCase())
    );

    setBookingData(filteredBookings);
  };

  const resetBookings = () => {
    setBookingData(initialBookingData);
  };

  return (
    <div className="w-full md:w-[900px] px-4 mx-auto">
      <div className="bg-stone-950 rounded-2xl mt-4 px-4 py-4">
        <h1 className="text-4xl font-bold text-center">Manage Bookings</h1>

        <div className="flex justify-between items-center mt-4">
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
              <option value="orderId">Order ID</option>
              <option value="userName">User Name</option>
              <option value="bookingDate">Booking Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>

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

          <button
            onClick={resetBookings}
            className="bg-yellow-300 hover:bg-yellow-400 text-slate-700 font-medium py-1 px-4 rounded-md"
          >
            Reset
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="border border-gray-300 w-full rounded-md">
            <thead className="bg-yellow-300 text-slate-700">
              <tr>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">Booking Date</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((booking) => (
                <tr key={booking._id} className="bg-stone-950">
                  <td className="py-3 px-6">{booking.orderId}</td>
                  <td className="py-3 px-6">{booking.userName}</td>
                  <td className="py-3 px-6">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td className="py-3 px-6">
                    {booking.items.map((item, index) => (
                      <div key={index}>{item.itemName} (x{item.quantity})</div>
                    ))}
                  </td>
                  <td className="py-3 px-6">{booking.amount}</td>
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
