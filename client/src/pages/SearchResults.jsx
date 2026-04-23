import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaFilter, FaStar, FaMapMarkerAlt, FaClock, FaArrowRight, FaWifi, FaChargingStation, FaSnowflake, FaBed, FaChair, FaTimes, FaBus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { generateBusResults } from '../data/demoData';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get('from') || 'Mumbai';
  const to = searchParams.get('to') || 'Pune';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const passengers = parseInt(searchParams.get('passengers')) || 1;

  const allBuses = useMemo(() => generateBusResults(from, to), [from, to]);

  // Filters
  const [filters, setFilters] = useState({ busType: [], ac: null, departureTime: [], priceRange: [0, 3000], sortBy: 'departure' });
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [expandedBus, setExpandedBus] = useState(null);

  const departureSlots = [
    { label: 'Early Morning', range: '00:00 - 06:00', icon: '🌅' },
    { label: 'Morning', range: '06:00 - 12:00', icon: '☀️' },
    { label: 'Afternoon', range: '12:00 - 18:00', icon: '🌤️' },
    { label: 'Evening', range: '18:00 - 24:00', icon: '🌙' },
  ];

  const timeInRange = (time, range) => {
    const [start, end] = range.split(' - ');
    return time >= start && time < end;
  };

  const filteredBuses = useMemo(() => {
    let result = [...allBuses];
    if (filters.busType.length > 0) {
      result = result.filter(bus => {
        return filters.busType.some(type => {
          if (type === 'sleeper') return bus.isSleeper;
          if (type === 'seater') return !bus.isSleeper;
          if (type === 'multiaxle') return bus.isMultiAxle;
          return false;
        });
      });
    }
    if (filters.ac !== null) {
      result = result.filter(bus => bus.isAC === filters.ac);
    }
    if (filters.departureTime.length > 0) {
      result = result.filter(bus => filters.departureTime.some(slot => {
        const range = departureSlots.find(s => s.label === slot)?.range;
        return range && timeInRange(bus.departure, range);
      }));
    }
    result = result.filter(bus => bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]);
    switch (filters.sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.operatorRating - a.operatorRating); break;
      case 'departure': result.sort((a, b) => a.departure.localeCompare(b.departure)); break;
      default: break;
    }
    return result;
  }, [allBuses, filters]);

  const toggleFilter = (key, value) => {
    setFilters(prev => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const clearFilters = () => {
    setFilters({ busType: [], ac: null, departureTime: [], priceRange: [0, 3000], sortBy: 'departure' });
  };

  const handleSelectBus = (bus) => {
    navigate(`/select-seat?busId=${bus.id}&from=${from}&to=${to}&date=${date}&passengers=${passengers}&price=${bus.price}&busType=${encodeURIComponent(bus.busType)}&operator=${encodeURIComponent(bus.operator)}&departure=${bus.departure}&arrival=${bus.arrival}&duration=${encodeURIComponent(bus.duration)}`);
  };

  const formatDate = (d) => {
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="search-page" id="search-page">
      {/* Top Bar */}
      <div className="search-top">
        <div className="search-top__container">
          <div className="search-top__route">
            <span className="search-top__city">{from}</span>
            <FaArrowRight className="search-top__arrow" />
            <span className="search-top__city">{to}</span>
          </div>
          <div className="search-top__meta">
            <span>{formatDate(date)}</span>
            <span className="search-top__dot">•</span>
            <span>{passengers} Passenger{passengers > 1 ? 's' : ''}</span>
            <span className="search-top__dot">•</span>
            <span>{filteredBuses.length} buses found</span>
          </div>
        </div>
      </div>

      {/* Sort Bar */}
      <div className="sort-bar">
        <div className="sort-bar__container">
          <div className="sort-bar__options">
            {[
              { value: 'departure', label: 'Departure' },
              { value: 'price-low', label: 'Price ↑' },
              { value: 'price-high', label: 'Price ↓' },
              { value: 'rating', label: 'Rating' },
            ].map(opt => (
              <button key={opt.value} className={`sort-bar__btn ${filters.sortBy === opt.value ? 'sort-bar__btn--active' : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, sortBy: opt.value }))} id={`sort-${opt.value}`}>
                {opt.label}
              </button>
            ))}
          </div>
          <button className="sort-bar__filter-toggle" onClick={() => setShowMobileFilter(!showMobileFilter)} id="filter-toggle">
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      <div className="search-content">
        <div className="search-content__container">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${showMobileFilter ? 'filters-sidebar--open' : ''}`} id="filters-sidebar">
            <div className="filters-sidebar__header">
              <h3><FaFilter /> Filters</h3>
              <button className="filters-sidebar__clear" onClick={clearFilters} id="clear-filters">Clear All</button>
              <button className="filters-sidebar__close" onClick={() => setShowMobileFilter(false)}><FaTimes /></button>
            </div>

            {/* Bus Type */}
            <div className="filter-group">
              <h4 className="filter-group__title">Bus Type</h4>
              {[{ key: 'seater', label: 'Seater', icon: <FaChair /> }, { key: 'sleeper', label: 'Sleeper', icon: <FaBed /> }, { key: 'multiaxle', label: 'Multi-Axle', icon: <FaBus /> }].map(type => (
                <label key={type.key} className="filter-check">
                  <input type="checkbox" checked={filters.busType.includes(type.key)} onChange={() => toggleFilter('busType', type.key)} />
                  <span className="filter-check__custom" />
                  <span className="filter-check__icon">{type.icon}</span>
                  <span>{type.label}</span>
                </label>
              ))}
            </div>

            {/* AC / Non-AC */}
            <div className="filter-group">
              <h4 className="filter-group__title">AC / Non-AC</h4>
              {[{ value: true, label: 'AC', icon: <FaSnowflake /> }, { value: false, label: 'Non-AC' }].map(opt => (
                <label key={String(opt.value)} className="filter-check">
                  <input type="radio" name="ac-filter" checked={filters.ac === opt.value} onChange={() => setFilters(prev => ({ ...prev, ac: prev.ac === opt.value ? null : opt.value }))} />
                  <span className="filter-check__custom filter-check__custom--radio" />
                  {opt.icon && <span className="filter-check__icon">{opt.icon}</span>}
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>

            {/* Departure Time */}
            <div className="filter-group">
              <h4 className="filter-group__title">Departure Time</h4>
              {departureSlots.map(slot => (
                <label key={slot.label} className="filter-check">
                  <input type="checkbox" checked={filters.departureTime.includes(slot.label)} onChange={() => toggleFilter('departureTime', slot.label)} />
                  <span className="filter-check__custom" />
                  <span className="filter-check__icon">{slot.icon}</span>
                  <span>{slot.label} <small>({slot.range})</small></span>
                </label>
              ))}
            </div>
          </aside>

          {/* Results */}
          <main className="results-list" id="results-list">
            {filteredBuses.length === 0 ? (
              <div className="results-empty">
                <FaBus className="results-empty__icon" />
                <h3>No buses found</h3>
                <p>Try adjusting your filters or search criteria</p>
                <button className="results-empty__btn" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              filteredBuses.map((bus, idx) => (
                <div key={bus.id} className="bus-card animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }} id={`bus-card-${bus.id}`}>
                  <div className="bus-card__main">
                    <div className="bus-card__left">
                      <div className="bus-card__operator">
                        <h3 className="bus-card__name">{bus.operator}</h3>
                        <div className="bus-card__rating">
                          <FaStar /> {bus.operatorRating}
                          <span className="bus-card__rating-count">({bus.totalRatings})</span>
                        </div>
                      </div>
                      <div className="bus-card__type">
                        {bus.isAC && <span className="bus-card__tag bus-card__tag--ac"><FaSnowflake /> AC</span>}
                        {bus.isSleeper ? <span className="bus-card__tag"><FaBed /> Sleeper</span> : <span className="bus-card__tag"><FaChair /> Seater</span>}
                        {bus.isMultiAxle && <span className="bus-card__tag bus-card__tag--premium">Multi-Axle</span>}
                      </div>
                    </div>

                    <div className="bus-card__schedule">
                      <div className="bus-card__time-block">
                        <span className="bus-card__time">{bus.departure}</span>
                        <span className="bus-card__city-label">{from}</span>
                      </div>
                      <div className="bus-card__duration">
                        <span className="bus-card__duration-line" />
                        <span className="bus-card__duration-text"><FaClock /> {bus.duration}</span>
                        <span className="bus-card__duration-line" />
                      </div>
                      <div className="bus-card__time-block">
                        <span className="bus-card__time">{bus.arrival}{bus.nextDay ? <sup>+1</sup> : ''}</span>
                        <span className="bus-card__city-label">{to}</span>
                      </div>
                    </div>

                    <div className="bus-card__right">
                      <div className="bus-card__price">₹{bus.price * passengers}</div>
                      <div className="bus-card__seats">{bus.availableSeats} seats left</div>
                      <button className="bus-card__select-btn" onClick={() => handleSelectBus(bus)} id={`select-bus-${bus.id}`}>
                        Select <FaArrowRight />
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <div className="bus-card__footer">
                    <div className="bus-card__amenities">
                      {bus.amenities.slice(0, 4).map((a, i) => (
                        <span key={i} className="bus-card__amenity">{a}</span>
                      ))}
                    </div>
                    <button className="bus-card__details-toggle" onClick={() => setExpandedBus(expandedBus === bus.id ? null : bus.id)}>
                      {expandedBus === bus.id ? <>Hide Details <FaChevronUp /></> : <>View Details <FaChevronDown /></>}
                    </button>
                  </div>

                  {expandedBus === bus.id && (
                    <div className="bus-card__expanded animate-fade-in">
                      <div className="bus-card__detail-section">
                        <h4>Boarding Points</h4>
                        {bus.boardingPoints.map((p, i) => (
                          <div key={i} className="bus-card__point"><FaMapMarkerAlt /> {p}</div>
                        ))}
                      </div>
                      <div className="bus-card__detail-section">
                        <h4>Dropping Points</h4>
                        {bus.droppingPoints.map((p, i) => (
                          <div key={i} className="bus-card__point"><FaMapMarkerAlt /> {p}</div>
                        ))}
                      </div>
                      <div className="bus-card__detail-section">
                        <h4>Cancellation Policy</h4>
                        <p className="bus-card__policy">{bus.cancellationPolicy}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
