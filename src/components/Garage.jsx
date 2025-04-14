import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchRegistration from "./hooks/useFetchRegistration";
import { FaExclamationTriangle } from "react-icons/fa";

function Garage() {
  const [vehicles, setVehicles] = useState([]);
  const [newRegistration, setNewRegistration] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { error, fetchCarDetails, loading } = useFetchRegistration();

  // Add new car to the garage
  const addCar = async () => {
    // TODO: Disable button if loading or no input
    const carDetails = await fetchCarDetails(newRegistration);
    if (carDetails) {
      setVehicles([...vehicles, carDetails]);
      setNewRegistration("");
    }
  };

  // Remove car from the garage
  const removeVehicle = (registrationNumber) => {
    const updatedList = vehicles.filter(
      (vehicle) => vehicle.registrationNumber !== registrationNumber
    );
    setVehicles(updatedList);

    if (
      selectedVehicle &&
      selectedVehicle.registrationNumber === registrationNumber
    ) {
      setSelectedVehicle(null);
    }
  };

  const handleSelectVehicle = (registrationNumber) => {
    const foundVehicle = vehicles.find(
      (vehicle) => vehicle.registrationNumber === registrationNumber
    );
    setSelectedVehicle(foundVehicle);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="mb-4 text-2xl font-semibold">Your Garage</h2>
      <input
        type="text"
        placeholder="Enter Registration Number"
        value={newRegistration}
        onChange={(e) => setNewRegistration(e.target.value)}
        className="border p-2 rounded-md mb-4"
      />
      <button
        onClick={addCar}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Car
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="max-w-4xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 text-xl mr-3" />
            <div>
              <h3 className="text-red-800 font-medium text-lg">Error</h3>
              {error &&
                Array.isArray(error) &&
                error.map((err, i) => (
                  <p key={i} className="text-red-700">
                    {err.title} {err.code}: {err.detail}
                  </p>
                ))}
              <p className="text-gray-600 mt-2 text-sm">Please try again.</p>
            </div>
          </div>
        </div>
      ) : null}

      <ul className="space-y-2 mt-4">
        {vehicles.map((vehicle) => (
          <li
            key={vehicle.registrationNumber}
            className="flex justify-between p-2 bg-gray-100 rounded-md"
          >
            <span>{vehicle.registrationNumber}</span>
            <button
              onClick={() => removeVehicle(vehicle.registrationNumber)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
            <button
              onClick={() => handleSelectVehicle(vehicle.registrationNumber)}
              className="text-blue-500 hover:underline"
            >
              Select
            </button>
            <Link
              to={`/car/${vehicle.registrationNumber}`}
              className="text-green-500 hover:underline"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
      {selectedVehicle && (
        <div className="mt-4 p-4 bg-gray-200 rounded-md">
          <h3 className="text-xl font-semibold">Selected Vehicle</h3>
          <p>Registration Number: {selectedVehicle.registrationNumber}</p>
        </div>
      )}
    </div>
  );
}

export default Garage;
