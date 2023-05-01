const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../models/bookingsModel");
const Bus = require("../models/busModel");
const User= require("../models/usersmodel");
const stripe = require("stripe")(process.env.stripe_key);
const { v4: uuidv4 } = require("uuid");

// book a seat

router.post("/book-seat", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      user: req.body.userId,
    });
    await newBooking.save();
    const bus = await Bus.findById(req.body.bus);
    
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    await bus.save();
    res.status(200).send({
      message: "Booking successful",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking failed",
      data: error,
      success: false,
    });
  }
});

// make payment

router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      res.status(200).send({
        message: "Payment successful",
        data: {
          transactionId: payment.id,
        },
        success: true,
      });
    } else {
      res.status(500).send({
        message: "Payment failed",
        data: error,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Payment failed",
      data: error,
      success: false,
    });
  }
});

// get bookings by user id
router.post("/get-bookings-by-user-id", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({user:req.body.userId})
      .populate("bus")
      .populate("user");
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});
// get all bookings
router.post("/get-all-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().populate("bus").populate("user");
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});


router.post('/cancel-seat',authMiddleware, async (req, res) => {
  try {
    const { _id, busId, userId, seats } = req.body;
    // check if _id, busId, and userId are valid
    const booking = await Booking.findOne({ _id: _id }).populate('bus').populate('user');
    if (!booking || booking.bus._id !== busId || booking.user._id !== userId) {
      return res.status(500).send({ success: false, message: 'Invalid request' });
    }
    // unblock the seat(s) on the bus
    const bus = await Bus.findOne({ _id: busId });
    bus.seats = bus.seats.map((seat) => {
      if (seats.includes(seat.number)) {
        seat.isBooked = false;
      }
      return seat;
    });
    await bus.save();
    // remove the booking from the database
    await Booking.deleteOne({ _id: _id });
    return res.status(200).send({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: error.message });
  }
});







module.exports = router;