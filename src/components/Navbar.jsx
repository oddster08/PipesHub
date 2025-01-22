import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link to="/" className="text-xl font-bold">
              Lawyer Appointment System
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
