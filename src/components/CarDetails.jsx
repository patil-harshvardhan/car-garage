import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "react-icons/fa";
import Error from "./Error";

function CarDetails() {
  const { registrationNumber } = useParams();
  const { fetchCarDetails, loading, data, error } = useFetchRegistration();

  useEffect(() => {
    if (!registrationNumber) {
      setErrorMessage("Invalid registration number");
      return;
    }
    fetchCarDetails(registrationNumber);
  }, [registrationNumber]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-blue-200 mb-4"></div>
          <p className="text-gray-500 text-xl">Loading car details...</p>
        </div>
      </div>
    );
  }

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        {data.make}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailCard
          icon={<FaCar className="text-blue-500" />}
          title="Registration"
          value={data.registrationNumber}
        />
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
          value={
            data && data.revenueWeight ? `${data.revenueWeight} kg` : "N/A"
          }
        />
        <DetailCard
          icon={<FaLeaf className="text-green-600" />}
          title="CO2 Emissions"
          value={`${data.co2Emissions} g/km`}
        />
      </div>

      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem title="Color" value={data.colour} />
          <InfoItem title="MOT Status" value={data.motStatus} />
          <InfoItem title="Tax Status" value={data.taxStatus} />
          <InfoItem
            title="Tax Due Date"
            value={new Date(data.taxDueDate).toLocaleDateString()}
          />
          <InfoItem title="Euro Status" value={data.euroStatus || "Invalid"} />
          <InfoItem
            title="Real Driving Emissions"
            value={data.realDrivingEmissions || "Invalid"}
          />
          <InfoItem title="Type Approval" value={data.typeApproval} />
          <InfoItem title="Wheel Plan" value={data.wheelplan} />
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
            {new Date(data.dateOfLastV5CIssued).toLocaleDateString()}
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
