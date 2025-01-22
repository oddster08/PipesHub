import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import LawyersList from './components/LawyersList';
import BookingPage from './components/BookingPage';
import AppointmentHistory from './components/AppointmentHistory';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<LawyersList />} />
              <Route path="/book/:lawyerId" element={<BookingPage />} />
              <Route path="/history/:lawyerId" element={<AppointmentHistory />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
