// ============================================
// Demo Data for TrioPunch Bus Ticketing System
// ============================================

export const popularCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Goa', 'Chandigarh', 'Kochi', 'Indore', 'Nagpur',
  'Bhopal', 'Visakhapatnam', 'Coimbatore', 'Mysore', 'Udaipur'
];

export const busOperators = [
  { id: 1, name: 'Royal Cruiser Travels', rating: 4.5, totalRatings: 2340 },
  { id: 2, name: 'Greenline Express', rating: 4.2, totalRatings: 1876 },
  { id: 3, name: 'Neeta Volvo', rating: 4.7, totalRatings: 3210 },
  { id: 4, name: 'SRS Travels', rating: 3.9, totalRatings: 1543 },
  { id: 5, name: 'Purple Travels', rating: 4.4, totalRatings: 2198 },
  { id: 6, name: 'VRL Travels', rating: 4.1, totalRatings: 2876 },
  { id: 7, name: 'Orange Travels', rating: 4.3, totalRatings: 1654 },
  { id: 8, name: 'KPN Travels', rating: 4.6, totalRatings: 2987 },
  { id: 9, name: 'Jabbar Travels', rating: 3.8, totalRatings: 1123 },
  { id: 10, name: 'IntrCity SmartBus', rating: 4.8, totalRatings: 4521 },
];

export const busTypes = [
  'AC Sleeper',
  'AC Seater',
  'Non-AC Sleeper',
  'Non-AC Seater',
  'AC Semi-Sleeper',
  'Volvo Multi-Axle AC Sleeper',
  'Volvo Multi-Axle AC Seater',
  'Mercedes Multi-Axle AC Sleeper',
  'Scania Multi-Axle AC Seater',
  'AC Seater / Sleeper (2+1)',
];

export const amenities = [
  'WiFi', 'Charging Point', 'Blanket', 'Water Bottle',
  'Reading Light', 'Track My Bus', 'Emergency Contact',
  'Movie Screen', 'Snacks', 'Pillow'
];

// Generate demo bus results
export const generateBusResults = (from, to) => {
  const departureTimes = [
    '06:00', '07:30', '08:45', '09:15', '10:30',
    '12:00', '14:30', '16:00', '18:00', '19:30',
    '20:45', '21:15', '22:00', '22:30', '23:00'
  ];

  const durations = ['6h 30m', '7h 15m', '8h 00m', '9h 45m', '5h 30m', '10h 15m', '7h 00m', '6h 45m'];

  const addHours = (time, duration) => {
    const [h, m] = time.split(':').map(Number);
    const dMatch = duration.match(/(\d+)h\s*(\d+)m/);
    const dh = parseInt(dMatch[1]);
    const dm = parseInt(dMatch[2]);
    let nh = (h + dh) % 24;
    let nm = m + dm;
    if (nm >= 60) { nh = (nh + 1) % 24; nm -= 60; }
    return `${String(nh).padStart(2, '0')}:${String(nm).padStart(2, '0')}`;
  };

  const prices = [450, 550, 650, 750, 850, 999, 1100, 1250, 1450, 1650, 1850, 2100, 2400, 800, 950];

  return departureTimes.map((dep, i) => {
    const operator = busOperators[i % busOperators.length];
    const type = busTypes[i % busTypes.length];
    const dur = durations[i % durations.length];
    const arrival = addHours(dep, dur);
    const isAC = type.toLowerCase().includes('ac') && !type.toLowerCase().includes('non-ac');
    const isMultiAxle = type.toLowerCase().includes('multi-axle');
    const isSleeper = type.toLowerCase().includes('sleeper');
    const availableSeats = Math.floor(Math.random() * 25) + 5;
    const busAmenities = amenities.slice(0, Math.floor(Math.random() * 6) + 3);

    return {
      id: i + 1,
      operator: operator.name,
      operatorRating: operator.rating,
      totalRatings: operator.totalRatings,
      busType: type,
      isAC,
      isMultiAxle,
      isSleeper,
      departure: dep,
      arrival: arrival,
      duration: dur,
      from,
      to,
      price: prices[i % prices.length],
      availableSeats,
      amenities: busAmenities,
      boardingPoints: [`${from} Central`, `${from} Station`, `${from} Highway`],
      droppingPoints: [`${to} Central`, `${to} Station`, `${to} Highway`],
      cancellationPolicy: 'Free cancellation before 6 hrs of departure',
      nextDay: parseInt(dep.split(':')[0]) + parseInt(dur.split('h')[0]) >= 24,
    };
  });
};

// Seat layout generator
export const generateSeatLayout = (busType) => {
  const isSleeper = busType.toLowerCase().includes('sleeper');

  if (isSleeper) {
    // Sleeper layout: 2+1 configuration, 2 decks
    const lowerDeck = [];
    const upperDeck = [];

    for (let row = 0; row < 8; row++) {
      // Left side (2 berths)
      lowerDeck.push({
        id: `L-${row * 3 + 1}`,
        number: row * 3 + 1,
        type: 'sleeper',
        position: 'lower-left',
        row, col: 0,
        status: Math.random() > 0.4 ? 'available' : 'booked',
        price: 0,
        gender: Math.random() > 0.7 ? 'female' : null,
      });
      lowerDeck.push({
        id: `L-${row * 3 + 2}`,
        number: row * 3 + 2,
        type: 'sleeper',
        position: 'lower-left',
        row, col: 1,
        status: Math.random() > 0.4 ? 'available' : 'booked',
        price: 0,
        gender: null,
      });
      // Right side (1 berth)
      lowerDeck.push({
        id: `L-${row * 3 + 3}`,
        number: row * 3 + 3,
        type: 'sleeper',
        position: 'lower-right',
        row, col: 3,
        status: Math.random() > 0.4 ? 'available' : 'booked',
        price: 0,
        gender: null,
      });
    }

    for (let row = 0; row < 8; row++) {
      upperDeck.push({
        id: `U-${row * 3 + 1}`,
        number: row * 3 + 25,
        type: 'sleeper',
        position: 'upper-left',
        row, col: 0,
        status: Math.random() > 0.5 ? 'available' : 'booked',
        price: 0,
        gender: null,
      });
      upperDeck.push({
        id: `U-${row * 3 + 2}`,
        number: row * 3 + 26,
        type: 'sleeper',
        position: 'upper-left',
        row, col: 1,
        status: Math.random() > 0.5 ? 'available' : 'booked',
        price: 0,
        gender: null,
      });
      upperDeck.push({
        id: `U-${row * 3 + 3}`,
        number: row * 3 + 27,
        type: 'sleeper',
        position: 'upper-right',
        row, col: 3,
        status: Math.random() > 0.5 ? 'available' : 'booked',
        price: 0,
        gender: null,
      });
    }

    return { lowerDeck, upperDeck, type: 'sleeper' };
  } else {
    // Seater layout: 2+2 configuration
    const seats = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 4; col++) {
        const seatNum = row * 4 + col + 1;
        seats.push({
          id: `S-${seatNum}`,
          number: seatNum,
          type: 'seater',
          row,
          col,
          isAisle: col === 1,
          status: Math.random() > 0.45 ? 'available' : 'booked',
          price: 0,
          gender: Math.random() > 0.85 ? 'female' : null,
        });
      }
    }
    // Last row: 5 seats
    for (let col = 0; col < 5; col++) {
      const seatNum = 41 + col;
      seats.push({
        id: `S-${seatNum}`,
        number: seatNum,
        type: 'seater',
        row: 10,
        col,
        isLastRow: true,
        status: Math.random() > 0.45 ? 'available' : 'booked',
        price: 0,
        gender: null,
      });
    }
    return { seats, type: 'seater' };
  }
};

// Offers data for homepage
export const offers = [
  { id: 1, code: 'FIRST50', discount: '50% OFF', description: 'On your first bus booking', maxDiscount: '₹200', validTill: 'Apr 30, 2026' },
  { id: 2, code: 'TRIO100', discount: '₹100 OFF', description: 'On bookings above ₹500', maxDiscount: '₹100', validTill: 'May 15, 2026' },
  { id: 3, code: 'SUMMER25', discount: '25% OFF', description: 'Summer special on AC buses', maxDiscount: '₹300', validTill: 'Jun 30, 2026' },
  { id: 4, code: 'WEEKEND', discount: '₹150 OFF', description: 'Weekend getaway offer', maxDiscount: '₹150', validTill: 'May 1, 2026' },
];

export const popularRoutes = [
  { from: 'Mumbai', to: 'Pune', price: 450, buses: 120 },
  { from: 'Delhi', to: 'Jaipur', price: 550, buses: 95 },
  { from: 'Bangalore', to: 'Chennai', price: 650, buses: 110 },
  { from: 'Hyderabad', to: 'Bangalore', price: 750, buses: 85 },
  { from: 'Mumbai', to: 'Goa', price: 850, buses: 75 },
  { from: 'Kolkata', to: 'Bhubaneswar', price: 500, buses: 60 },
];
