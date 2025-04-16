
    document.addEventListener('DOMContentLoaded', () => {
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('travelDate').setAttribute('min', today);
    });

    const busData = [
      { name: "Express Bus", type: "AC Seater", time: "06:00 AM", duration: "5h", fare: 450 },
      { name: "Volvo Sleeper", type: "AC Sleeper", time: "09:30 AM", duration: "6.5h", fare: 750 },
      { name: "Sharma Travels", type: "Non-AC Seater", time: "01:00 PM", duration: "7h", fare: 300 },
      { name: "Greenline Express", type: "AC Sleeper", time: "03:45 PM", duration: "5.5h", fare: 600 },
      { name: "Luxury Liner", type: "AC Semi-Sleeper", time: "08:00 PM", duration: "6h", fare: 700 }
    ];

    function searchBuses() {
      const source = document.getElementById('source').value;
      const destination = document.getElementById('destination').value;
      const travelDate = document.getElementById('travelDate').value;
      const today = new Date().toISOString().split('T')[0];

      if (!source) {
        alert("Please select a source.");
        return;
      }

      if (!destination) {
        alert("Please select a destination.");
        return;
      }

      if (source === destination) {
        alert("Source and destination cannot be the same.");
        return;
      }

      if (!travelDate) {
        alert("Please select a travel date.");
        return;
      }

      if (travelDate < today) {
        alert("Travel date cannot be in the past.");
        return;
      }

      const busResults = document.getElementById('busResults');
      busResults.innerHTML = '';
      busResults.style.display = 'block';

      busData.forEach(bus => {
        const busItem = document.createElement('div');
        busItem.className = 'bus-item';
        busItem.onclick = () => selectBus(bus.name, bus.fare);
        busItem.innerHTML = `
          <strong>${bus.name}</strong> - ${bus.type}<br>
          Departure: ${bus.time} | Duration: ${bus.duration} | Fare: ₹${bus.fare}
        `;
        busResults.appendChild(busItem);
      });
    }

    function selectBus(busName, farePerSeat) {
      document.getElementById('seatSelection').style.display = 'block';
      const seatsContainer = document.getElementById('seatsContainer');
      seatsContainer.innerHTML = '';
      seatsContainer.setAttribute('data-fare', farePerSeat);

      for (let i = 1; i <= 20; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.textContent = `Seat ${i}`;
        seat.onclick = function () {
          seat.classList.toggle('selected');
          updateFare();
        };
        seatsContainer.appendChild(seat);
      }
    }

    function updateFare() {
      const selectedSeats = document.querySelectorAll('.seat.selected');
      const farePerSeat = Number(document.getElementById('seatsContainer').getAttribute('data-fare'));
      const fare = selectedSeats.length * farePerSeat;
      document.getElementById('fareInfo').textContent = `Selected Seats: ${selectedSeats.length}, Total Fare: ₹${fare}`;
    }

    function showPassengerForm() {
      const selectedSeats = document.querySelectorAll('.seat.selected');
      if (selectedSeats.length === 0) {
        alert("Please select at least one seat before proceeding.");
        return;
      }
      document.getElementById('passengerForm').style.display = 'block';
    }

    function validateForm() {
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
      }
      if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return false;
      }
      alert('Booking successful!');
      return true;
    }
