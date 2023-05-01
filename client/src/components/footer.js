import React from 'react'
import '../resources/footer.css';
import { Link } from 'react-router-dom';

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function Footer() {
   return (
      <div className='footer'>
         <div class="box-container">

            <div className="box">
               <h3>Quick Links</h3>
               <Link to="/" onClick={scrollToTop}>Home</Link>
               <Link to="/about" onClick={scrollToTop}>About</Link>
            </div>

            <div className="box">
               <h3>Useful Links</h3>
               <Link to="/bookings" onClick={scrollToTop}>Manage Bookings</Link>
               <Link to="/bookings" onClick={scrollToTop}>Show my Ticket</Link>
            </div>

            <div className="box">
               <h3>Contact Info</h3>
               <p> <i class="ri-phone-fill"></i> +919992222222 </p>
               <p> <i class="ri-map-pin-line"></i> Bangalore, India - 560064 </p>
            </div>


            <div className="box">
               <h3>Follow us</h3>
               <a href="#"> <i class="ri-facebook-circle-fill"></i> facebook </a>
               <a href="#"> <i class="ri-twitter-fill"></i> twitter </a>
            </div>

         </div>

         <div className="email">
         <h2 className="email">Email us : <i class="ri-mail-fill"></i>  contact@travelswift.com</h2>
         </div>

         <p className="credit"> &copy; copyright  @ 2023 by TravelSwift </p>

      </div>
   )
}

export default Footer;
