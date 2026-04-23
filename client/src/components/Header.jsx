import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBus, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${isHomePage && !scrolled ? 'header--transparent' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo" id="header-logo">
          <div className="header__logo-icon">
            <FaBus />
          </div>
          <div className="header__logo-text">
            <span className="header__logo-brand">TrioPunch</span>
            <span className="header__logo-sub">BUS</span>
          </div>
        </Link>

        <nav className={`header__nav ${mobileMenu ? 'header__nav--open' : ''}`}>
          <Link to="/" className={`header__nav-link ${location.pathname === '/' ? 'active' : ''}`} id="nav-home">
            Home
          </Link>
          <Link to="/" className="header__nav-link" id="nav-offers">
            Offers
          </Link>
          <Link to="/" className="header__nav-link" id="nav-help">
            Help
          </Link>
        </nav>

        <div className="header__actions">
          <button className="header__mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} id="mobile-toggle">
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
