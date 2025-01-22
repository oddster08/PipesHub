import { useState } from 'react';
import { Link } from 'react-router-dom';
import { lawyers, specialties } from '../data/mockData';

function LawyersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const filteredLawyers = lawyers.filter((lawyer) => {
    const nameMatch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const specialtyMatch = selectedSpecialty === '' || lawyer.specialties.includes(selectedSpecialty);
    return nameMatch && specialtyMatch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Legal Experts</h1>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nameSearch" className="block text-sm font-medium text-gray-700 mb-2">
              Search by Lawyer Name
            </label>
            <input
              type="text"
              id="nameSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter lawyer name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="specialtyFilter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Specialty
            </label>
            <select
              id="specialtyFilter"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4 text-gray-600">
        Found {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? 's' : ''}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLawyers.map((lawyer) => (
          <div key={lawyer.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{lawyer.name}</h2>
                <p className="text-sm text-gray-500">ID: {lawyer.id}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {lawyer.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Availability</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-600">
                    {lawyer.availability.start} - {lawyer.availability.end}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    (30 minutes per consultation)
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Consultation Fee</h3>
                <p className="text-2xl font-bold text-green-600">
                  ₹{lawyer.costPerAppointment.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to={`/book/${lawyer.id}`}
                  className="bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Book Appointment
                </Link>
                <Link
                  to={`/history/${lawyer.id}`}
                  className="bg-gray-600 text-white text-center px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
                >
                  View Appointment History
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LawyersList;
