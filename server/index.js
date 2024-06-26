const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const socketIo = require('socket.io');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bookingRoutes = require('./api/routes/bookingRoutes');


// middleware
app.use(cors());
app.use(express.json());

//connect to mongoDB config
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xueqaud.mongodb.net?retryWrites=true&w=majority`)
.then(() => console.log('MongoDB connected...'))

  // jwt authentication
  app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token});
  })


//   import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes')
const paymentRoutes = require('./api/routes/paymentRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);
app.use('/bookings', bookingRoutes);

//stripe payment route
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  console.log(price);
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",

    payment_method_types: [
      "card"
    ],

  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



app.get("/", (req, res) => {
  res.send("Hello Three Sisters Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
