import React from 'react';
import '../resources/about.css';
import { FaMapMarkerAlt, FaCreditCard, FaMobileAlt, FaRegClock } from 'react-icons/fa';

function About() {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>About Travel Swift</h1>
                <p>
                    Travel Swift is a modern and user-friendly bus booking system that makes it easy to book your next trip.
                    With a wide range of bus routes and schedules, you can find the perfect trip for your needs.
                </p>
                <p>
                    Our system is designed to be easy to use, whether you're booking a single ticket or a group trip.
                    You can view schedules, choose your seats, and pay securely online.
                </p>
                <h2><FaMapMarkerAlt className="icon" />Latest Features</h2>
                <ul>
                    <li><FaRegClock className="icon" />Real-time bus tracking</li>
                    <li><FaCreditCard className="icon" />Multiple payment options</li>
                    <li><FaMobileAlt className="icon" />Mobile app for iOS and Android</li>
                    <li><FaRegClock className="icon" />24/7 customer support</li>
                    <li><FaRegClock className="icon" />Flexible cancellation policy</li>
                </ul>
                <p>
                    With our real-time bus tracking, you can see exactly where your bus is and when it will arrive.
                    We offer multiple payment options, including credit card, debit card, and UPI,
                    to make it easy to pay for your tickets.
                    And our mobile app makes it even easier to book and manage your trips on the go.
                </p>
                <p>
                    If you have any questions or concerns, our customer support team is available 24/7 to help you. We also offer a flexible cancellation policy,
                    so you can change your plans if something comes up.
                </p>
            </div>
        </div>
    );
}

export default About;
