import { FaBus, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,40 1440,50 L1440,100 L0,100 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="footer__content">
        <div className="footer__container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <div className="footer__logo-icon">
                  <FaBus />
                </div>
                <div className="footer__logo-text">
                  <span className="footer__logo-brand">TrioPunch</span>
                  <span className="footer__logo-sub">BUS</span>
                </div>
              </div>
              <p className="footer__tagline">
                India's most trusted bus booking platform. Travel comfortably with over 2500+ bus operators across 100,000+ routes.
              </p>
              <div className="footer__socials">
                <a href="#" className="footer__social-link" id="social-facebook"><FaFacebook /></a>
                <a href="#" className="footer__social-link" id="social-twitter"><FaTwitter /></a>
                <a href="#" className="footer__social-link" id="social-instagram"><FaInstagram /></a>
                <a href="#" className="footer__social-link" id="social-linkedin"><FaLinkedin /></a>
              </div>
            </div>

            <div className="footer__links">
              <h4 className="footer__links-title">Quick Links</h4>
              <Link to="/" className="footer__link">Home</Link>
              <Link to="/" className="footer__link">About Us</Link>
              <Link to="/" className="footer__link">Bus Operators</Link>
              <Link to="/" className="footer__link">Offers</Link>
              <Link to="/" className="footer__link">Blog</Link>
            </div>

            <div className="footer__links">
              <h4 className="footer__links-title">Support</h4>
              <Link to="/" className="footer__link">Help Center</Link>
              <Link to="/" className="footer__link">FAQs</Link>
              <Link to="/" className="footer__link">Cancellation Policy</Link>
              <Link to="/" className="footer__link">Terms & Conditions</Link>
              <Link to="/" className="footer__link">Privacy Policy</Link>
            </div>

            <div className="footer__contact">
              <h4 className="footer__links-title">Contact Us</h4>
              <div className="footer__contact-item">
                <FaPhone />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="footer__contact-item">
                <FaEnvelope />
                <span>support@triopunch.com</span>
              </div>
              <div className="footer__contact-item">
                <FaMapMarkerAlt />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__container">
          <p>&copy; 2026 TrioPunch Bus. All rights reserved.</p>
          <p>Made with ❤️ for comfortable journeys</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
