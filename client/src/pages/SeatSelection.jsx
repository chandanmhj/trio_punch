import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft, FaClock, FaMapMarkerAlt, FaStar, FaBus, FaUser, FaRupeeSign } from 'react-icons/fa';
import { generateSeatLayout } from '../data/demoData';
import './SeatSelection.css';

const SeatSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get('from') || 'Mumbai';
  const to = searchParams.get('to') || 'Pune';
  const date = searchParams.get('date') || '';
  const passengers = parseInt(searchParams.get('passengers')) || 1;
  const price = parseInt(searchParams.get('price')) || 800;
  const busType = decodeURIComponent(searchParams.get('busType') || 'AC Seater');
  const operator = decodeURIComponent(searchParams.get('operator') || 'Royal Cruiser');
  const departure = searchParams.get('departure') || '08:00';
  const arrival = searchParams.get('arrival') || '14:30';
  const duration = decodeURIComponent(searchParams.get('duration') || '6h 30m');

  const layout = useMemo(() => generateSeatLayout(busType), [busType]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeDeck, setActiveDeck] = useState('lower');
  const [showPayment, setShowPayment] = useState(false);

  const isSleeper = layout.type === 'sleeper';

  const toggleSeat = (seat) => {
    if (seat.status === 'booked') return;
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === seat.id);
      if (exists) return prev.filter(s => s.id !== seat.id);
      if (prev.length >= passengers) return [...prev.slice(1), seat];
      return [...prev, seat];
    });
  };

  const getSeatClass = (seat) => {
    let cls = 'seat';
    if (seat.status === 'booked') cls += ' seat--booked';
    else if (selectedSeats.find(s => s.id === seat.id)) cls += ' seat--selected';
    else cls += ' seat--available';
    if (seat.gender === 'female') cls += ' seat--female';
    if (isSleeper) cls += ' seat--sleeper';
    return cls;
  };

  const totalPrice = selectedSeats.length * price;

  const formatDate = (d) => {
    if (!d) return '';
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const handlePay = () => {
    setShowPayment(true);
    setTimeout(() => {
      alert('🎉 Booking Confirmed! Your tickets have been booked successfully.\n\nBooking ID: TP' + Math.random().toString(36).substring(2, 8).toUpperCase() + '\nSeats: ' + selectedSeats.map(s => s.number).join(', ') + '\nTotal: ₹' + totalPrice);
      navigate('/');
    }, 1500);
  };

  const renderSeaterLayout = () => {
    const seats = layout.seats;
    const rows = {};
    seats.forEach(seat => {
      if (!rows[seat.row]) rows[seat.row] = [];
      rows[seat.row].push(seat);
    });

    return (
      <div className="seat-grid seat-grid--seater">
        {/* Driver area */}
        <div className="seat-grid__driver">
          <div className="seat-grid__steering">🚌</div>
        </div>
        {Object.keys(rows).map(rowIdx => {
          const row = rows[rowIdx];
          const isLastRow = row[0]?.isLastRow;
          return (
            <div key={rowIdx} className={`seat-row ${isLastRow ? 'seat-row--last' : ''}`}>
              {row.map((seat, ci) => (
                <div key={seat.id} style={{ display: 'contents' }}>
                  {!isLastRow && ci === 2 && <div className="seat-aisle" />}
                  <button
                    className={getSeatClass(seat)}
                    onClick={() => toggleSeat(seat)}
                    disabled={seat.status === 'booked'}
                    title={`Seat ${seat.number}`}
                    id={`seat-${seat.id}`}
                  >
                    <span className="seat__number">{seat.number}</span>
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderSleeperLayout = (deck) => {
    const seats = deck === 'lower' ? layout.lowerDeck : layout.upperDeck;
    const rows = {};
    seats.forEach(seat => {
      if (!rows[seat.row]) rows[seat.row] = [];
      rows[seat.row].push(seat);
    });

    return (
      <div className="seat-grid seat-grid--sleeper">
        <div className="seat-grid__driver">
          <div className="seat-grid__steering">🚌</div>
        </div>
        {Object.keys(rows).map(rowIdx => {
          const row = rows[rowIdx];
          return (
            <div key={rowIdx} className="seat-row seat-row--sleeper">
              {row.map((seat, ci) => (
                <div key={seat.id} style={{ display: 'contents' }}>
                  {ci === 2 && <div className="seat-aisle seat-aisle--sleeper" />}
                  <button
                    className={getSeatClass(seat)}
                    onClick={() => toggleSeat(seat)}
                    disabled={seat.status === 'booked'}
                    title={`Berth ${seat.number}`}
                    id={`seat-${seat.id}`}
                  >
                    <span className="seat__number">{seat.number}</span>
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="seat-page" id="seat-page">
      <div className="seat-page__top">
        <div className="seat-page__top-container">
          <button className="seat-page__back" onClick={() => navigate(-1)} id="back-to-results">
            <FaArrowLeft /> Back to results
          </button>
          <div className="seat-page__trip-info">
            <div className="seat-page__operator">
              <h2>{operator}</h2>
              <span className="seat-page__bus-type">{busType}</span>
            </div>
            <div className="seat-page__schedule">
              <div className="seat-page__time-block">
                <span className="seat-page__time">{departure}</span>
                <span className="seat-page__city">{from}</span>
              </div>
              <div className="seat-page__dur">
                <span className="seat-page__dur-line" />
                <span><FaClock /> {duration}</span>
                <span className="seat-page__dur-line" />
              </div>
              <div className="seat-page__time-block">
                <span className="seat-page__time">{arrival}</span>
                <span className="seat-page__city">{to}</span>
              </div>
            </div>
            <div className="seat-page__date">{formatDate(date)}</div>
          </div>
        </div>
      </div>

      <div className="seat-page__content">
        <div className="seat-page__container">
          {/* Seat Layout */}
          <div className="seat-layout" id="seat-layout">
            <div className="seat-layout__header">
              <h3>Select Your {isSleeper ? 'Berth' : 'Seat'}</h3>
              <p>Click on available {isSleeper ? 'berths' : 'seats'} to select (max {passengers})</p>
            </div>

            {/* Legend */}
            <div className="seat-legend">
              <div className="seat-legend__item"><div className="seat-legend__box seat-legend__box--available" /><span>Available</span></div>
              <div className="seat-legend__item"><div className="seat-legend__box seat-legend__box--selected" /><span>Selected</span></div>
              <div className="seat-legend__item"><div className="seat-legend__box seat-legend__box--booked" /><span>Booked</span></div>
              <div className="seat-legend__item"><div className="seat-legend__box seat-legend__box--female" /><span>Ladies</span></div>
            </div>

            {/* Deck Toggle for Sleeper */}
            {isSleeper && (
              <div className="deck-toggle" id="deck-toggle">
                <button className={`deck-toggle__btn ${activeDeck === 'lower' ? 'deck-toggle__btn--active' : ''}`} onClick={() => setActiveDeck('lower')}>Lower Deck</button>
                <button className={`deck-toggle__btn ${activeDeck === 'upper' ? 'deck-toggle__btn--active' : ''}`} onClick={() => setActiveDeck('upper')}>Upper Deck</button>
              </div>
            )}

            {/* Seat Map */}
            <div className="seat-map">
              {isSleeper ? renderSleeperLayout(activeDeck) : renderSeaterLayout()}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="booking-summary" id="booking-summary">
            <div className="booking-summary__card">
              <h3 className="booking-summary__title">Booking Summary</h3>

              <div className="booking-summary__route">
                <div className="booking-summary__route-item">
                  <FaMapMarkerAlt className="booking-summary__icon--green" />
                  <div>
                    <span className="booking-summary__label">From</span>
                    <span className="booking-summary__value">{from}</span>
                  </div>
                </div>
                <div className="booking-summary__route-item">
                  <FaMapMarkerAlt className="booking-summary__icon--red" />
                  <div>
                    <span className="booking-summary__label">To</span>
                    <span className="booking-summary__value">{to}</span>
                  </div>
                </div>
              </div>

              <div className="booking-summary__divider" />

              <div className="booking-summary__detail">
                <span>Bus</span><span>{operator}</span>
              </div>
              <div className="booking-summary__detail">
                <span>Type</span><span>{busType}</span>
              </div>
              <div className="booking-summary__detail">
                <span>Date</span><span>{formatDate(date)}</span>
              </div>
              <div className="booking-summary__detail">
                <span>Departure</span><span>{departure}</span>
              </div>

              <div className="booking-summary__divider" />

              <div className="booking-summary__seats">
                <h4>Selected {isSleeper ? 'Berths' : 'Seats'} ({selectedSeats.length}/{passengers})</h4>
                {selectedSeats.length === 0 ? (
                  <p className="booking-summary__no-seats">No seats selected yet</p>
                ) : (
                  <div className="booking-summary__seat-tags">
                    {selectedSeats.map(seat => (
                      <span key={seat.id} className="booking-summary__seat-tag">
                        {isSleeper ? 'B' : 'S'}{seat.number}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="booking-summary__divider" />

              <div className="booking-summary__pricing">
                <div className="booking-summary__price-row">
                  <span>Base Fare × {selectedSeats.length}</span>
                  <span>₹{selectedSeats.length * price}</span>
                </div>
                <div className="booking-summary__price-row">
                  <span>Service Tax</span>
                  <span>₹{Math.round(selectedSeats.length * price * 0.05)}</span>
                </div>
                <div className="booking-summary__divider" />
                <div className="booking-summary__total">
                  <span>Total Amount</span>
                  <span>₹{totalPrice + Math.round(totalPrice * 0.05)}</span>
                </div>
              </div>

              <button
                className={`booking-summary__pay-btn ${selectedSeats.length === 0 ? 'booking-summary__pay-btn--disabled' : ''} ${showPayment ? 'booking-summary__pay-btn--loading' : ''}`}
                disabled={selectedSeats.length === 0 || showPayment}
                onClick={handlePay}
                id="continue-to-pay"
              >
                {showPayment ? (
                  <div className="auth__spinner" />
                ) : (
                  <>
                    Continue to Pay <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
