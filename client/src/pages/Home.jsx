import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaSearch, FaExchangeAlt, FaTag, FaRoute, FaBus, FaShieldAlt, FaHeadset, FaChevronRight } from 'react-icons/fa';
import { popularCities, offers, popularRoutes } from '../data/demoData';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Set today as default date
  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setDate(formatted);
  }, []);

  const filteredFromCities = popularCities.filter(city =>
    city.toLowerCase().includes(from.toLowerCase()) && city !== to
  );

  const filteredToCities = popularCities.filter(city =>
    city.toLowerCase().includes(to.toLowerCase()) && city !== from
  );

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to) return;
    const searchFrom = from || 'Mumbai';
    const searchTo = to || 'Pune';
    navigate(`/search?from=${searchFrom}&to=${searchTo}&date=${date}&passengers=${passengers}`);
  };

  const handleQuickRoute = (route) => {
    navigate(`/search?from=${route.from}&to=${route.to}&date=${date}&passengers=1`);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) setShowFromSuggestions(false);
      if (toRef.current && !toRef.current.contains(e.target)) setShowToSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="home" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero__bg">
          <img src="/hero-bg.png" alt="Bus journey" className="hero__bg-img" />
          <div className="hero__overlay" />
        </div>

        <div className="hero__content">
          <div className="hero__text animate-fade-in-up">
            <h1 className="hero__title">
              Book Bus Tickets <br />
              <span className="hero__title-accent">Anytime, Anywhere</span>
            </h1>
            <p className="hero__subtitle">
              Travel with comfort across 100,000+ routes with India's most trusted bus booking platform
            </p>
          </div>

          {/* Search Box */}
          <form className="hero__search-box animate-fade-in-up" onSubmit={handleSearch} id="search-box">
            <div className="hero__search-fields">
              {/* From */}
              <div className="hero__field" ref={fromRef}>
                <label className="hero__field-label">
                  <FaMapMarkerAlt className="hero__field-icon hero__field-icon--from" />
                  From
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => { setFrom(e.target.value); setShowFromSuggestions(true); }}
                  onFocus={() => setShowFromSuggestions(true)}
                  placeholder="Departure city"
                  className="hero__field-input"
                  id="input-from"
                />
                {showFromSuggestions && from.length > 0 && (
                  <div className="hero__suggestions" id="from-suggestions">
                    {filteredFromCities.slice(0, 6).map(city => (
                      <button type="button" key={city} className="hero__suggestion-item" onClick={() => { setFrom(city); setShowFromSuggestions(false); }}>
                        <FaMapMarkerAlt /> {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <button type="button" className="hero__swap-btn" onClick={swapCities} id="swap-cities">
                <FaExchangeAlt />
              </button>

              {/* To */}
              <div className="hero__field" ref={toRef}>
                <label className="hero__field-label">
                  <FaMapMarkerAlt className="hero__field-icon hero__field-icon--to" />
                  To
                </label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => { setTo(e.target.value); setShowToSuggestions(true); }}
                  onFocus={() => setShowToSuggestions(true)}
                  placeholder="Arrival city"
                  className="hero__field-input"
                  id="input-to"
                />
                {showToSuggestions && to.length > 0 && (
                  <div className="hero__suggestions" id="to-suggestions">
                    {filteredToCities.slice(0, 6).map(city => (
                      <button type="button" key={city} className="hero__suggestion-item" onClick={() => { setTo(city); setShowToSuggestions(false); }}>
                        <FaMapMarkerAlt /> {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="hero__field">
                <label className="hero__field-label">
                  <FaCalendarAlt className="hero__field-icon" />
                  Date of Journey
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="hero__field-input"
                  id="input-date"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Passengers */}
              <div className="hero__field hero__field--small">
                <label className="hero__field-label">
                  <FaUsers className="hero__field-icon" />
                  Passengers
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                  className="hero__field-input"
                  id="input-passengers"
                >
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="hero__search-btn" id="search-buses-btn">
              <FaSearch />
              <span>Search Buses</span>
            </button>
          </form>
        </div>
      </section>

      {/* Features Strip */}
      <section className="features-strip">
        <div className="features-strip__container">
          <div className="features-strip__item">
            <div className="features-strip__icon"><FaBus /></div>
            <div><h4>2500+ Operators</h4><p>Verified bus partners</p></div>
          </div>
          <div className="features-strip__item">
            <div className="features-strip__icon"><FaShieldAlt /></div>
            <div><h4>Safe Travel</h4><p>Sanitized & safe buses</p></div>
          </div>
          <div className="features-strip__item">
            <div className="features-strip__icon"><FaHeadset /></div>
            <div><h4>24/7 Support</h4><p>Round the clock help</p></div>
          </div>
          <div className="features-strip__item">
            <div className="features-strip__icon"><FaTag /></div>
            <div><h4>Best Prices</h4><p>Lowest fare guarantee</p></div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers-section" id="offers-section">
        <div className="offers-section__container">
          <div className="section-header">
            <h2 className="section-title">Exclusive Offers</h2>
            <p className="section-subtitle">Save big on your next journey</p>
          </div>
          <div className="offers-grid">
            {offers.map(offer => (
              <div key={offer.id} className="offer-card" id={`offer-${offer.id}`}>
                <div className="offer-card__badge">{offer.discount}</div>
                <div className="offer-card__content">
                  <h3 className="offer-card__title">{offer.description}</h3>
                  <div className="offer-card__code">
                    <span>Code:</span>
                    <strong>{offer.code}</strong>
                  </div>
                  <p className="offer-card__valid">Valid till {offer.validTill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="routes-section" id="routes-section">
        <div className="routes-section__container">
          <div className="section-header">
            <h2 className="section-title">Popular Routes</h2>
            <p className="section-subtitle">Most booked bus routes this month</p>
          </div>
          <div className="routes-grid">
            {popularRoutes.map((route, i) => (
              <button key={i} className="route-card" onClick={() => handleQuickRoute(route)} id={`route-${i}`}>
                <div className="route-card__cities">
                  <span className="route-card__city">{route.from}</span>
                  <FaChevronRight className="route-card__arrow" />
                  <span className="route-card__city">{route.to}</span>
                </div>
                <div className="route-card__info">
                  <span className="route-card__price">from ₹{route.price}</span>
                  <span className="route-card__buses">{route.buses} buses</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
