import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchRegistration from "./hooks/useFetchRegistration";
import Error from "./Error";
import { FaPlus, FaTrash, FaCheck, FaInfoCircle, FaCar } from "react-icons/fa";

function Garage() {
  const [vehicles, setVehicles] = useState(
    localStorage.getItem("garage-vehicles")
      ? JSON.parse(localStorage.getItem("garage-vehicles"))
      : []
  );
  const [newRegistration, setNewRegistration] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { error, fetchCarDetails, loading } = useFetchRegistration();

  // Load vehicles from localStorage on component mount
  useEffect(() => {
    const savedVehicles = localStorage.getItem("garage-vehicles");
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles));
    }
  }, []);

  // Save vehicles to localStorage whenever they change
  useEffect(() => {
    const storedVehicles =
      JSON.parse(localStorage.getItem("garage-vehicles")) || [];
    storedVehicles.push(vehicles);
    localStorage.setItem("garage-vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  // Add new car to the garage
  const addCar = async () => {
    if (!newRegistration.trim() || loading) return;

    const carDetails = await fetchCarDetails(newRegistration);
    const existingVehicle = vehicles.find(
      (vehicle) => vehicle.registrationNumber === newRegistration
    );
    if (carDetails && !existingVehicle) {
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

  // Handle Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addCar();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg md:shadow-md p-6">
        <div className="flex items-center mb-6">
          <FaCar className="text-blue-600 text-3xl mr-3" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Your Garage
          </h2>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-700 mb-2 font-medium">
            Add a vehicle to your garage
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Enter Registration Number (e.g., AB12CDE)"
                value={newRegistration}
                onChange={(e) =>
                  setNewRegistration(e.target.value.toUpperCase())
                }
                onKeyDown={handleKeyPress}
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                disabled={loading}
              />
            </div>
            <button
              onClick={addCar}
              disabled={!newRegistration.trim() || loading}
              className={`flex items-center justify-center px-4 py-3 rounded-md text-white font-medium transition-colors ${
                !newRegistration.trim() || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FaPlus className="mr-2" />
              Add Vehicle
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center p-4 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">
              Verifying registration...
            </span>
          </div>
        )}

        {error && <Error error={error} />}

        {vehicles.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <FaCar className="mx-auto text-gray-300 text-5xl mb-3" />
            <p className="text-gray-500 text-lg">Your garage is empty</p>
            <p className="text-gray-400">Add a vehicle using the form above</p>
          </div>
        ) : (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Your Vehicles
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <li
                    key={vehicle.registrationNumber}
                    className={`transition-colors ${
                      selectedVehicle?.registrationNumber ===
                      vehicle.registrationNumber
                        ? "bg-blue-50"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex-grow mb-2 sm:mb-0">
                        <div className="font-medium">
                          {vehicle.make} {vehicle.model || ""}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {vehicle.registrationNumber} •{" "}
                          {vehicle.yearOfManufacture || "N/A"}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            handleSelectVehicle(vehicle.registrationNumber)
                          }
                          className={`text-sm px-3 py-1 rounded flex items-center ${
                            selectedVehicle?.registrationNumber ===
                            vehicle.registrationNumber
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          <FaCheck className="mr-1" size={12} />
                          Select
                        </button>
                        <Link
                          to={`/car/${vehicle.registrationNumber}`}
                          className="text-sm bg-green-600 text-white px-3 py-1 rounded flex items-center hover:bg-green-700"
                        >
                          <FaInfoCircle className="mr-1" size={12} />
                          Details
                        </Link>
                        <button
                          onClick={() =>
                            removeVehicle(vehicle.registrationNumber)
                          }
                          className="text-sm bg-red-600 text-white px-3 py-1 rounded flex items-center hover:bg-red-700"
                        >
                          <FaTrash className="mr-1" size={12} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {selectedVehicle && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              Selected Vehicle
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Registration</p>
                <p className="font-medium">
                  {selectedVehicle.registrationNumber}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Make</p>
                <p className="font-medium">{selectedVehicle.make}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Color</p>
                <p className="font-medium">{selectedVehicle.colour}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Fuel Type</p>
                <p className="font-medium">{selectedVehicle.fuelType}</p>
              </div>
            </div>
            <div className="mt-3">
              <Link
                to={`/car/${selectedVehicle.registrationNumber}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Garage;
