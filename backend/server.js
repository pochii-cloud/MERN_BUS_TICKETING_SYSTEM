require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport=require('passport')
const cookieSession=require('cookie-session')
const app = express();
const dbconfig = require("./config/dbconfig")
const { encodeXText } = require('nodemailer/lib/shared');
const port = process.env.PORT || 5000;


const usersRoute = require('./routes/usersRoute');
const busesRoute = require('./routes/busesRoute');
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json()); 
app.use(cookieSession({
  name:"session",
  keys:["cyberwolve"],
  maxAge:24*60*60*100
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
  })
)


app.use('/api/users',usersRoute);
app.use('/api/buses',busesRoute);
app.use("/api/bookings", bookingsRoute);


app.get('/',(req,res)=>{
   res.send('server is up')
})

app.listen(port,(req,res)=>{
    console.log(`server listening on port ${port}!`)
});

