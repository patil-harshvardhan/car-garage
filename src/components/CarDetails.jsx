import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetchRegistration from "./hooks/useFetchRegistration";
import {
  FaCar,
  FaGasPump,
  FaWeight,
  FaCalendarAlt,
  FaTachometerAlt,
  FaLeaf,
  FaRoad,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";
import Error from "./Error";
import Loader from "./Loader";


const getCarImageUrl = (make) => {
  const mockCarImages = [
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80",
  ];

  const idx = Math.floor(Math.random() * mockCarImages.length);
  return mockCarImages[idx];
};

function CarDetails() {
  const { registrationNumber } = useParams();
  const { fetchCarDetails, loading, data, error } = useFetchRegistration();
  const history = useHistory();

  useEffect(() => {
    if (registrationNumber) {
      fetchCarDetails(registrationNumber);
    }
  }, [registrationNumber]);

  // Helper for MOT status
  const getMotStatus = () => {
    if (!data) return null;
    const isValid = data.motStatus?.toLowerCase() === "valid";
    const expiry = data.motExpiryDate ? new Date(data.motExpiryDate) : null;
    const now = new Date();
    const expired = expiry && expiry < now;
    return {
      isValid: isValid && !expired,
      expired,
      expiryDate: expiry,
    };
  };

  const mot = getMotStatus();

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen min-w-screen p-4">
        <div className="max-w-4xl mx-auto">
          <Error error={error} />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 text-center">
        <p className="text-gray-500">No vehicle data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg mt-8">
      <button
        onClick={() => {history.push("/");}}
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition"
      >
        <FaArrowLeft className="mr-2" /> Back to Home
      </button>

      <div className="w-full flex justify-center mb-6">
        <img
          src={getCarImageUrl(data.make)}
          alt={`${data.make} car`}
          className="rounded-lg shadow-md object-cover w-full max-w-xl h-48 sm:h-64"
          loading="lazy"
        />
      </div>

      <h2 className="text-3xl font-bold text-center mb-2 text-blue-600">
        {data.make}
      </h2>
      <p className="text-center text-lg text-gray-700 mb-6 tracking-widest">
        {data.registrationNumber}
      </p>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailCard
          icon={<FaGasPump className="text-green-500" />}
          title="Fuel Type"
          value={data.fuelType}
        />
        <DetailCard
          icon={<FaCalendarAlt className="text-red-500" />}
          title="Year of Manufacture"
          value={data.yearOfManufacture}
        />
        <DetailCard
          icon={<FaTachometerAlt className="text-purple-500" />}
          title="Engine Capacity"
          value={`${data.engineCapacity} cc`}
        />
        <DetailCard
          icon={<FaWeight className="text-yellow-500" />}
          title="Revenue Weight"
          value={data.revenueWeight ? `${data.revenueWeight} kg` : "N/A"}
        />
        <DetailCard
          icon={<FaLeaf className="text-green-600" />}
          title="CO2 Emissions"
          value={`${data.co2Emissions} g/km`}
        />
        <DetailCard
          icon={<FaCar className="text-blue-500" />}
          title="Colour"
          value={data.colour}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow flex items-center">
          {mot?.isValid ? (
            <FaCheckCircle className="text-green-600 text-3xl mr-4" />
          ) : (
            <FaTimesCircle className="text-red-600 text-3xl mr-4" />
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-500">MOT Status</h3>
            <p className="text-lg font-semibold">
              {mot?.isValid
                ? `Valid until ${mot.expiryDate?.toLocaleDateString()}`
                : mot?.expired
                ? `Expired on ${mot.expiryDate?.toLocaleDateString()}`
                : "Not valid"}
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg shadow flex items-center">
          {data.taxStatus?.toLowerCase() === "taxed" ? (
            <FaCheckCircle className="text-green-600 text-3xl mr-4" />
          ) : (
            <FaTimesCircle className="text-red-600 text-3xl mr-4" />
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Tax Status</h3>
            <p className="text-lg font-semibold">
              {data.taxStatus}
              {data.taxDueDate &&
                ` (Due: ${new Date(data.taxDueDate).toLocaleDateString()})`}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem title="Euro Status" value={data.euroStatus || "N/A"} />
          <InfoItem
            title="Real Driving Emissions"
            value={data.realDrivingEmissions || "N/A"}
          />
          <InfoItem title="Type Approval" value={data.typeApproval} />
          <InfoItem title="Wheel Plan" value={data.wheelplan} />
          <InfoItem
            title="Marked for Export"
            value={data.markedForExport ? "Yes" : "No"}
          />
        </div>
      </div>

      <div className="mt-8 bg-blue-100 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <FaRoad className="text-blue-600 mr-2" />
          <span className="font-semibold">First Registered:</span>
          <span className="ml-2">{data.monthOfFirstRegistration}</span>
        </div>
        <div className="flex items-center">
          <FaFileAlt className="text-blue-600 mr-2" />
          <span className="font-semibold">Last V5C Issued:</span>
          <span className="ml-2">
            {data.dateOfLastV5CIssued
              ? new Date(data.dateOfLastV5CIssued).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ icon, title, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow flex items-center">
      <div className="mr-4 text-2xl">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

function InfoItem({ title, value }) {
  return (
    <div>
      <span className="font-medium">{title}:</span> {value}
    </div>
  );
}

export default CarDetails;
