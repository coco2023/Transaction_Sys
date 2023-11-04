import React from "react";
import "./Footer.css"; // Make sure to create a Footer.css file for styling

const Footer = () => {
  return (
    <footer class="footer-container">
      <div class="footer-section">
        <h4>Company info</h4>
        <ul>
          <li>About Temu</li>
          <li>Temu - Team Up, Price Down!</li>
          <li>Affiliate & Influencer Program</li>
          <li>Campus ambassador</li>
          <li>Contact us</li>
          <li>Careers</li>
          <li>Press</li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Customer service</h4>
        <ul>
          <li>Return and refund policy</li>
          <li>Intellectual property policy</li>
          <li>Shipping info</li>
          <li>Student discount</li>
          <li>Your Recalls and Product Safety Alerts</li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Help</h4>
        <ul>
          <li>Support center & FAQ</li>
          <li>Temu purchase protection</li>
          <li>Sitemap</li>
          <li>How to order</li>
          <li>How to track</li>
          <li>Sell on Temu</li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Download the Temu App</h4>
        <ul>
          <li>
            <a href="#">Download on the App Store</a>
          </li>
          <li>
            <a href="#">Get it on Google Play</a>
          </li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Connect with Temu</h4>
        <ul class="social-media-links">
          <li>
            <a href="#">Instagram</a>
          </li>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">TikTok</a>
          </li>
          <li>
            <a href="#">YouTube</a>
          </li>
          <li>
            <a href="#">Pinterest</a>
          </li>
        </ul>
      </div>

      <div class="footer-bottom">
        <div class="security-certification">
          <img src="/path-to-your-images/visa.png" alt="Visa" />
          <img src="/path-to-your-images/mastercard.png" alt="MasterCard" />
        </div>
        <div class="payment-acceptance">
          <img src="/path-to-your-images/paypal.png" alt="PayPal" />
          <img src="/path-to-your-images/amex.png" alt="American Express" />
        </div>
        <div class="footer-legal">
          <p>© 2023 WhaleCo Inc.</p>
          <a href="#">Terms of use</a>
          <a href="#">Privacy policy</a>
          <a href="#">Your privacy choices</a>
          <a href="#">Ad Choices</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
