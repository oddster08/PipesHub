import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lawyers } from '../data/mockData';

function AppointmentHistory() {
  const { lawyerId } = useParams();
  const appointments = useSelector((state) => state.appointments.appointments);
  const lawyer = lawyers.find((lawyer) => lawyer.id === parseInt(lawyerId));
  const lawyerAppointments = appointments.filter(
    (appointment) => appointment.lawyerId === parseInt(lawyerId)
  );

  if (!lawyer) {
    return <div>Lawyer not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Appointment History - {lawyer.name}
      </h2>
      {lawyerAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments found for this lawyer.</p>
      ) : (
        <div className="space-y-3">
          {lawyerAppointments.map((appointment) => (
            <div key={appointment.id} className="border p-3 rounded">
              <p className="font-medium">Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Fee: ₹{appointment.cost}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentHistory;
