import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookAppointment } from '../store/appointmentsSlice';
import { lawyers } from '../data/mockData';
import { format, parse, addMinutes } from 'date-fns';

function BookingPage() {
  const { lawyerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);
  const lawyer = lawyers.find((lawyer) => lawyer.id === parseInt(lawyerId));
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!lawyer) {
    return <div>Lawyer not found</div>;
  }

  const generateTimeSlots = () => {
    const slots = [];
    const start = parse(lawyer.availability.start, 'HH:mm', new Date());
    const end = parse(lawyer.availability.end, 'HH:mm', new Date());
    let current = start;

    while (current <= end) {
      slots.push(format(current, 'HH:mm'));
      current = addMinutes(current, 30);
    }

    return slots;
  };

  const isSlotAvailable = (date, time) => {
    return !appointments.some((apt) => {
      return apt.lawyerId === lawyer.id && apt.date === date && apt.time === time;
    });
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time.');
      return;
    }

    if (!isSlotAvailable(selectedDate, selectedTime)) {
      alert('Selected slot is not available.');
      return;
    }

    dispatch(
      bookAppointment({
        id: Date.now(),
        lawyerId: lawyer.id,
        date: selectedDate,
        time: selectedTime,
        cost: lawyer.costPerAppointment,
      })
    );

    alert('Appointment booked successfully!');
    navigate(`/history/${lawyer.id}`);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-50 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Book Appointment with {lawyer.name}</h2>
      
      <div className="mb-3">
        <label className="block text-gray-600 mb-1">Select Date:</label>
        <input
          type="date"
          min={new Date().toISOString().split('T')[0]}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Select Time:</label>
        <div className="grid grid-cols-4 gap-2">
          {generateTimeSlots().map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              disabled={!isSlotAvailable(selectedDate, time)}
              className={`p-2 rounded text-sm ${
                selectedTime === time
                  ? 'bg-blue-500 text-white'
                  : !isSlotAvailable(selectedDate, time)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-lg font-medium">Consultation Fee: ₹{lawyer.costPerAppointment}</p>
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Book Appointment
      </button>
    </div>
  );
}

export default BookingPage;
