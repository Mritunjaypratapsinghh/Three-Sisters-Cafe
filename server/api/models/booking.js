const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userName: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
