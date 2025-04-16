
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('travelDate').setAttribute('min', today);
});

const trainData = [
  { name: "Rajdhani Express", type: "AC First Class", time: "06:00 AM", duration: "8h", fare: 1500 },
  { name: "Shatabdi Express", type: "AC Chair Car", time: "09:00 AM", duration: "5.5h", fare: 1200 },
  { name: "Duronto Express", type: "Sleeper", time: "12:30 PM", duration: "10h", fare: 800 },
  { name: "Garib Rath", type: "3AC", time: "03:00 PM", duration: "9h", fare: 950 },
  { name: "Tejas Express", type: "Executive Chair Car", time: "06:00 PM", duration: "6h", fare: 1600 }
];

function searchTrains() {
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

  const trainResults = document.getElementById('trainResults');
  trainResults.innerHTML = '';
  trainResults.style.display = 'block';

  trainData.forEach(train => {
    const trainItem = document.createElement('div');
    trainItem.className = 'train-item';
    trainItem.onclick = () => selectTrain(train.name, train.fare);
    trainItem.innerHTML = `
      <strong>${train.name}</strong> - ${train.type}<br>
      Departure: ${train.time} | Duration: ${train.duration} | Fare: ₹${train.fare}
    `;
    trainResults.appendChild(trainItem);
  });
}

function selectTrain(trainName, farePerSeat) {
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
