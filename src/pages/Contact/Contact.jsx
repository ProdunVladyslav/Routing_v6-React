import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page-wrapper">
      <h1>Contact Us</h1>

      <p className="contact-intro">
        Have a question or need help with an order? Here are the easiest ways to reach us.
      </p>

      <div className="contact-info-blocks">
        <div className="contact-block">
          <h2>Email</h2>
          <p>support@justdecor.example</p>
        </div>

        <div className="contact-block">
          <h2>Phone</h2>
          <p>+1 (555) 123-4567</p>
        </div>

        <div className="contact-block">
          <h2>Business Hours</h2>
          <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
          <p>Sat: 10:00 AM – 3:00 PM</p>
        </div>

        <div className="contact-block">
          <h2>Location</h2>
          <p>Just Decor HQ</p>
          <p>123 Green Street</p>
          <p>Portland, OR 97201</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
