import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-col">
          <h3>FusionXCanteeN</h3>
          <p>
            Serving fresh, hygienic, and delicious meals every day at affordable prices.
            Your hunger, our responsibility!
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p><FaPhoneAlt /> +91 9335110984</p>
          <p><FaEnvelope /> fusionxcanteen@gmail.com</p>
          <p><FaMapMarkerAlt /> Bhaisamau BKT NH-24 (226201),Lucknow , India</p>
        </div>

        {/* Social Media */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FusionXCanteeN | All Rights Reserved 
          Made By Abhinav Pandey|Vivek Yadav
        </p>
      </div>
    </footer>
  );
}

export default Footer;
